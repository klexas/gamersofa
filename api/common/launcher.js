var userService = require('../services/userService/main');
var express = require('express');
var constants = require('./constants');

var launch = function(service){
    console.info(service);
    try {
        switch(service){
            case constants.USER:
                userService.init(express);
            break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { 
    launch
}