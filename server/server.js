// includes library
var http = require('http');
var express = require('express');
var path = require('path');

// Http port for connetion
const HTTP_PORT = '3000';

var app = express();

// if user request for home page.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../dist/templates','/app.html'));
});


app.use(express.static(__dirname+"/.."));
// start webserver
app.listen(HTTP_PORT);
