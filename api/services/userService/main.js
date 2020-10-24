var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname  + "/config.json"));
var app_reference; 
const { createHttpTerminator } = require('http-terminator')
var httpTerminator;

function setupRoutes(){
    app_reference.get('/user', ((req, res)=> {
        console.log('User API hit from ' );
        console.log(req);
        res.status(200).send('User API');

    }));
}
function init(express){
    console.log(config);
    app_reference = express();
    setupRoutes();

    var server = app_reference.listen(config.hub.port);
    httpTerminator = createHttpTerminator({ server })

    return {
        userService_connection: app_reference,
        response: 'UserService online'
    };
}   


function shut_down(){
    httpTerminator.terminate();
}
module.exports = { 
    init,
    shut_down
}