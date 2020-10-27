var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname  + "/config.json"));
var app_reference; 
const { createHttpTerminator } = require('http-terminator')
var httpTerminator;

function init(express){
    console.log(config);
    app_reference = express();
    setupRoutes();
    // setup server
    var server = app_reference.listen(config.hub.port);
    httpTerminator = createHttpTerminator({ server })

    return {
        service_connection: app_reference,
        response: 'Service online'
    };
}

function shut_down(){
    httpTerminator.terminate();
}

module.exports = { 
    init,
    shut_down
}