 var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                     
    var morgan = require('morgan');             
    var bodyParser = require('body-parser');    
    var methodOverride = require('method-override');    

    app.use(express.static(__dirname + '/src'));                 
    app.use(morgan('dev'));                                         
    app.use(bodyParser.urlencoded({'extended':'true'}));           
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());


    app.get('*', function(req, res) {
        res.sendfile('./src/index.html');
    });

    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 8080);
    console.log("App listening on port 8080");