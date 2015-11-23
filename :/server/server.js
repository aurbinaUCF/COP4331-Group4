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

app.listen(8081,function(){
	console.log('Started Server @ http://localhost:8081');
})
var tokenID; 
var sqlite3 = require('sqlite3');
var companyDb = new sqlite3.Database('./company.db');
var projectDb = new sqlite3.Database('./projects.db');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

app.set('secretKey', 'knightTracker');

if(typeof localStorage === "undefined" || localStorage === null)
{
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var token;

app.get('/', function (req, res,next) {
  var resources = [
  {

  		href: domain + '/',
  		action: 'Returns a list of URIs specific to the site'
  }];
res.json(resources);
});


app.get('/login',function(req,res){
	var access = localStorage.getItem("token");
	if(access){
		jwt.verify(access,app.get('secretKey'),function(err,results){
			if (err){
				return console.log(err);
			}
			else{
					res.json(results);
					console.log(results);
			}
		});
	}
	else{
		return res.stat(403).send({
				success:false,
				message:'No token provided'
		});
	}
});

app.post('/auth', function(req,res){


	var password = req.body.password; 
	console.log("input password = "+ password);


	var search = "SELECT userID, companyToken,name,role, password, email FROM users WHERE email = '" + req.body.email +"'";
	console.log('search = '+ search);
	companyDb.get(search, function(err,row){

		var hashedPW = row.password;
		
		console.log("Database hashedpw = " + hashedPW);
		var key = bcrypt.compareSync(password,hashedPW);
		console.log("key = "+ key);
		if(key){
			var userJSON = {
				userID: row.userID,
				companyToken: row.companyToken,
				name:row.name,
				email:row.email,
				role:row.role
			};
			token = jwt.sign(userJSON,app.get('secretKey'),{
				expiresInMinutes: 1440
			});
			localStorage.setItem("token",token);
			res.redirect('http://localhost/dashboard.html');
	
		}
		else{
			res.redirect(200,'http://localhost/retry.html');
			
		}
	})
});

app.post('/logout', function(req,res){


	localStorage.clear();
	res.redirect(200,'http://localhost/');


});
app.post('/todo',function(req, res){
	
	var submitTask = 'INSERT INTO todo (userID, tasklist) VALUES' + "('"+req.body.userid+ "','" +req.body.todolist+ "')";
	companyDb.run(submitTask);	

}),

app.post('/gettodo', function(req,res){
	var getToDo = "SELECT tasklist FROM todo WHERE userID ='"+req.body.ID+"'";
	companyDb.get(getToDo, function(err, row){
			res.json(row);
		}); 

}), 
app.post('/calendar', function(req,res){
	var submitCalendar = 'INSERT INTO calendar (userID, calendarInformation) VALUES' + "('"+ req.body.userid + "','"+req.body.calendarinfo "')";
	companyDb.run(submitCalendar);
}),
app.post('/getCalendar', function(req, res){
	var getCalendar = "SELECT calendarInformation FROM calendar WHERE userID ='" +req.body.userid+ "'";
	companyDb.get(getCalendar, function(err,row){
		res.json(row);
	});
}),

app.post('/register', function(req, res) {

	if(req.body.title == "developer"){

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password,salt); 
		var userHash = bcrypt.hashSync(req.body.name,salt);

		var createuser = 'INSERT INTO users (name, email, password, role, userID, companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + userHash+ "','"+ req.body.token+ "')";
		companyDb.run(createuser);
		res.redirect('http://localhost/dashboard.html');

	}
	else if(req.body.title == "manager"){

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password,salt); 
		var managerHash = bcrypt.hashSync(req.body.name,salt);
		var companyTokenHash = bcrypt.hashSync(req.body.company,salt);

		console.log("password Hash = "+ hash);
		console.log("manager hash = "+ managerHash);

		var createManager = 'INSERT INTO users (name, email, password, role, userID,companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + managerHash+"','" +companyTokenHash+"')";
		console.log("\n\n\n"+createManager);
		companyDb.run(createManager);

		var createCompany = 'INSERT INTO accounts(companyName, managerID,companyToken) VALUES'+ "('" +req.body.company + "','"+ managerHash +"','"+ companyTokenHash+"')";

		companyDb.run(createCompany);
		res.redirect('http://localhost/dashboard.html');
	}
	

});

app.post('/createProject', function(req,res){

	var CreateDB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var createProjectInfo = "CREATE TABLE 'info' (
		'managerID'       TEXT, 
		'userID'          TEXT, 
		'projectID'       INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
		'projectName'     TEXT,
		'projectDescription'     TEXT)";

	var createRequirements = "CREATE TABLE 'Requirements' (
	`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`taskInfo`	TEXT,
	`userID`	TEXT,
	'status'    TEXT,
	`companyToken`	TEXT
)";
	var createDesign = "CREATE TABLE 'Design' (
	`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`taskInfo`	TEXT,
	`userID`	TEXT,
	'status'    TEXT,
	`companyToken`	TEXT
)";
	var createImplementation = "CREATE TABLE 'Implementation' (
	`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`taskInfo`	TEXT,
	`userID`	TEXT,
	'status'    TEXT,
	`companyToken`	TEXT
)";
	var createVerification = "CREATE TABLE 'Verification' (
	`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`taskInfo`	TEXT,
	`userID`	TEXT,
	'status'    TEXT,
	`companyToken`	TEXT
)";
	var createMaintanence = "CREATE TABLE 'Maintanence' (
	`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`taskInfo`	TEXT,
	`userID`	TEXT,
	'status'    TEXT,
	`companyToken`	TEXT
)";
	CreateaDB.run(createProjectInfo);
	CreateDB.run(createRequirements);
	CreateDB.run(createDesign);
	CreateDB.run(createImplementation);
	CreateDB.run(createVerification);
	CreateDB.run(createMaintanence); 

	var infoSubmit = "INSERT INTO info (managerID, projectName, projectDescription) VALUES '" +req.body.userID+ "','" + req.body.projectName + "','"+ req.body.projectDescription+"')";
	CreateDB.run(infoSubmit); 

});


app.post('/projectTask', function(err,rows){
	var DB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var newTask = "INSERT INTO Requirements (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')"; 
	var deleteTask = "DELETE FROM Requirements WHERE taskInfo = "+ req.body.taskInfo; 
	DB.run(newTask); 
});

app.post('/updateTask/Requirements', function(err,rows){
	var DB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var newTask = "INSERT INTO Design (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')"; 
	var deleteTask = "DELETE FROM Requirements WHERE taskInfo = "+ req.body.taskInfo; 	
}); 

app.post('/updateTask/design', function(err,rows){
	var DB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var newTask = "INSERT INTO Implementation (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')"; 
	var deleteTask = "DELETE FROM Design WHERE taskInfo = "+ req.body.taskInfo; 
}); 
app.post('/updateTask/implementation', function(err,rows){
	var DB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var newTask = "INSERT INTO Verification (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')"; 
	var deleteTask = "DELETE FROM Implementation WHERE taskInfo = "+ req.body.taskInfo; 
}); 

app.post('/updateTask/verification', function(err,rows){
	var DB = new sqlite3.Database('./'+req.body.projectName+'.db');
	var newTask = "INSERT INTO Maintanence (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')"; 
	var deleteTask = "DELETE FROM Verification WHERE taskInfo = "+ req.body.taskInfo; 
}); 

