var config = require('./common/config');
var launcher = require('./common/launcher');
var consts = require('./common/constants');
var config = require('./common/config');
var express = require('express');
var cors = require('cors');
var http = require('http');

var userService = require('./services/userService/main');
var serviceReferences = {};

// TODO: create bootstrap to clean this up
var app = express();
app.use(cors());

app.use(express.static(__dirname + '/client'));

app.get('/api', ((req, res)=> {
    res.status(500).send('No direct access allowed.');
}));

app.get('/api/test', ((req, res)=>{
    console.log('Tester ... getting services');

    serviceReferences.userService = userService.init(express);

    res.send('UserService started');
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