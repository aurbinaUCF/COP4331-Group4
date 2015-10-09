var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var handleCors = function(req, res,next){
    res.header =('Access-Control-Allow-Origin', '*');
    res.header =('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header =('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(handleCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var util = require('util');
var http = require('http');


var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./company.db');
var projectDb = new sqlite3.Database('./projects.db');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

app.set('secretKey', 'knightTracker');

if(typeof localStorage === "undefined" || localStorage === null)
{
  var LocalStorage = require('node-localstorage').LocalStorage;
  LocalStorage = new LocalStorage('./scratch');
}








app.get('/', function (req, res) {
  res.send('Hello World');
});

console.log("server has started");



app.get('/auth', function(req,res){

  var username = req.body.username;
  console.log(username);


});


app.get('/register', function(req, res) {

  var username = req.body.username;
  console.log(username);



});



app.listen(8080);
