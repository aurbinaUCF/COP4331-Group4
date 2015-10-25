var express = require('express');
var bodyParser = require('body-parser');

var handleCors = function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
};

var app = express();
app.use(handleCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
var util = require('util');
var http = require('http');

app.listen(8080,function(){
	console.log('Started Server @ http://localhost:8080');
})

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


app.get('/', function (req, res,next) {
  var resources = [
  {

  		href: domain + '/',
  		action: 'Returns a list of URIs specific to the site'
  }];
res.json(resources);
});

console.log("server has started");

app.post('/auth', function(req,res){


});


app.post('/register', function(req, res) {

	if(req.body.title == "developer"){
		console.log('developer selected');	
		console.log('token= ' +req.body.token);	
		console.log('name = '+req.body.name);	
		console.log('email = '+req.body.email);
		console.log('password = ' +req.body.password);
	}
	else if(req.body.title == "manager"){
		console.log(req.body.title);	
		console.log(req.body.name);	
		console.log(req.body.email);
		console.log(req.body.password);
	}
	

});


