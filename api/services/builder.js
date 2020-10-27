var fs = require('fs');
// Take in params and read the template files to generate a new service 
var newService = (serviceName, port)=>{
    var templateFiles = {
        config: JSON.parse(fs.readFileSync(__dirname + '/template/config.json')),
        main: fs.readFileSync(__dirname + '/template/main.js')
    };

    // replace {port}, {serviceName} and {host} in the config\

    // Replace same in the main.js

    // create new folder with serviceName

    // save new files 

    console.log(templateFiles);

}

module.exports = {
    newService
}