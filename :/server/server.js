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
var companyDb = new sqlite3.Database('./company.db');
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


app.post('/auth', function(req,res){


	var password = req.body.password; 

	var salt = bcrypt.genSaltSync(15);
	var userhash = bcrypt.hashSync(password,salt); 

	var search = "SELECT companyToken,name,role, password, email FROM users WHERE email = '" + req.body.email +"'";
	console.log(search);
	companyDb.get(search, function(err,row){
		console.log(row.password);

	});
	/*companyDb.get(search, function(err,row){
		var hashedPW = row.password;
		var key = bcrypt.compareSync(userhash,hashedPW);
		if(key){
			var userJSON = {
				userID: row.userID,
				companyToken: row.companyToken,
				name:row.name,
				email:row.email,
				role:row.role
			};
			var token = jwt.sign(userJSON,app.get(secretKey),{
				expiresInMinutes: 1440
			});
			localStorage.setItem("token",token);
			console.log('success');
			res.redirect('http://localhost/track/dashboard.html');
		}
		else{
			console.log('reject');
			res.status(404);
			res.redirect('http://localhost/track/calendar.html');
		}
	})*/
});


app.post('/register', function(req, res) {

	if(req.body.title == "developer"){

		var salt = bcrypt.genSaltSync(15);
		var hash = bcrypt.hashSync(req.body.password,salt); 
		var userHash = bcrypt.hashSync(req.body.name,salt);

		var createuser = 'INSERT INTO users (name, email, password, role, userID, companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + userHash+ "','"+ req.body.token+ "')";
		companyDb.run(createuser);
		res.redirect('/dashboard.html');

	}
	else if(req.body.title == "manager"){

		var salt = bcrypt.genSaltSync(15);
		var hash = bcrypt.hashSync(req.body.password,salt); 
		var managerHash = bcrypt.hashSync(req.body.name,salt);
		var companyTokenHash = bcrypt.hashSync(req.body.company,salt);


		var createManager = 'INSERT INTO users (name, email, password, role, userID,companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + managerHash+"','" +companyTokenHash+"')";
		companyDb.run(createManager);

		var createCompany = 'INSERT INTO accounts(companyName, managerID,companyToken) VALUES'+ "('" +req.body.company + "','"+ managerHash +"','"+ companyTokenHash+"')";

		companyDb.run(createCompany);
		res.redirect('/dashboard.html');
	}
	

});


