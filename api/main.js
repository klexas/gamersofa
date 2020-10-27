var config = require('./common/config');
var launcher = require('./common/launcher');
var builder = require('./services/builder');
var consts = require('./common/constants');
var config = require('./common/config');
var express = require('express');
var cors = require('cors');

var userService = require('./services/userService/main');
var serviceReferences = {};

// TODO: create bootstrap to clean this up
var app = express();
app.use(cors());

app.use(express.static(__dirname + '/client'));

app.get('/api', ((req, res)=> {
    res.status(500).send('No direct access allowed.');
}));

app.get('/api/start', ((req, res)=>{
    console.log('Tester ... getting services');
    let serviceOutput = '';
    Object.keys(consts).forEach(service => {
        try {
            launcher.launch(consts[service]);
            serviceOutput += '\r<br /> Starting service :  ' + consts[service];  
        } catch (error) {
            console.error(error);
        }
    });
    res.send(serviceOutput);

}))

app.get('/api/service/create/:name', ((req, res)=>{
    console.info('Creating new Service : ' + req.params.name);
    builder.newService(req.params.name);
    res.send('Done');
}))

app.get('/api/userService/close', ((req, res)=>{
    if(serviceReferences.userService){
        var response = userService.shut_down();
        console.info(response);
        res.send(response);
     }
     else{
        res.send('User Service is not active');
     }
}))


console.log(config.connections.entry);
// Start
app.listen(config.connections.entry.port, (()=>{
    console.log('Listening on port: ' + config.connections.entry.port);
}))