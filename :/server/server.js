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
var sqlite3 = require('sqlite3').verbose();
var companyDb = new sqlite3.Database('./company.db');
var projectDb = new sqlite3.Database('./projects.db');
var co = require('co'); 
var sqliteConnect = require('co-sqlite3');

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


	var search = "SELECT userID, companyToken,name,role, password, email, companyName FROM users WHERE email = '" + req.body.email +"'";
	companyDb.get(search, function(err,row){

		var hashedPW = row.password;
		
		var key = bcrypt.compareSync(password,hashedPW);
		
		if(key){
			var userJSON = {

				userID: row.userID,
				companyToken: row.companyToken,
				name:row.name,
				email:row.email,
				role:row.role,
				companyName: row.companyName
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



app.get('/logout', function(req,res){


	localStorage.clear();
	res.redirect(200,'http://localhost/');


});
app.post('/todo',function(req, res){
	
	var submitTask = 'INSERT INTO todo (userID, tasklist) VALUES' + "('"+req.body.userid+ "','" +req.body.todolist+ "')";
	companyDb.serialize(function(){
	//var submitTask = "UPDATE todo SET tasklist='" + req.body.todolist+"' WHERE userID = '"+ req.body.userid+"'";
		companyDb.serialize(function(){
			companyDb.run(submitTask);	
		});
	res.redirect(200,'http://localhost/dashboard.html');
	});
}),

app.post('/gettodo', function(req,res){
	companyDb.serialize(function(){
	var getToDo = "SELECT tasklist FROM todo WHERE userID ='"+req.body.userid+"'";
	companyDb.get(getToDo, function(err, row){
			res.json(row);
		}); 
	}); 
}), 
app.post('/calendar', function(req,res){
	
	companyDb.serialize(function(){
		//var submitCalendar = "'UPDATE calendar SET calendarInformation = '" +req.body.calendarinfo+"' WHERE userID = '"+ req.body.userid+"'";
		var submitCalendar = 'INSERT INTO calendar (userID, calendarInformation) VALUES' + "('"+ req.body.userid + "','"+req.body.calendarinfo +"')";
		companyDb.run(submitCalendar);
		res.redirect(200,'http://localhost/dashboard.html');
	});
}),

app.post('/getCalendar', function(req, res){
	console.log("trying to get calendar"); 
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
		companyDb.serialize(function(){
				var createuser = 'INSERT INTO users (name, email, password, role, userID, companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + userHash+ "','"+ req.body.token+ "')";
				companyDb.run(createuser);
				var todoInsert = "INSERT INTO todo (userID) VALUES ('"+userHash+"')";
				var calendarInsert = "INSERT INTO calendar (userID) VALUES ('"+userHash+"')";  
				companyDb.run(todoInsert);
				companyDb.run(calendarInsert);
				res.redirect('http://localhost/dashboard.html');
			});
	}
	else if(req.body.title == "manager"){

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password,salt); 
		var managerHash = bcrypt.hashSync(req.body.name,salt);
		var companyTokenHash = bcrypt.hashSync(req.body.company,salt);

		companyDb.serialize(function(){
		var createManager = 'INSERT INTO users (name, email, password, role, userID,companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + managerHash+"','" +companyTokenHash+"')";
			console.log("\n\n\n"+createManager);
			companyDb.run(createManager);
		});
		companyDb.serialize(function(){
			var todoInsert = "INSERT INTO todo (userID) VALUES ('"+hash+"')";
			companyDb.run(todoInsert);
		});
		companyDb.serialize(function(){
			var temp = {"info":[{"id":"event1","title":"Automatically Imported Event","start":"2015-11-01T04:00:00.000Z","end":null,"className":"event-orange","allDay":true},{"id":"event2","title":"What not to do at a stop light?","start":"2015-11-05T05:00:00.000Z","end":null,"className":"event-red","allDay":true},{"id":"event3","title":"Fiesta Party","start":"2015-11-16T00:00:00.000Z","end":"2015-11-16T03:30:00.000Z","className":"event-purple","allDay":false},{"title":"Work","start":"2015-12-09T05:00:00.000Z","end":null,"allDay":false}]};
			var calendarInsert = "INSERT INTO calendar (userID,calendarInformation) VALUES ('"+hash+"','" + JSON.stringify(temp)+"')";  
			companyDb.run(calendarInsert);
		});
		companyDb.serialize(function(){
			var createCompany = 'INSERT INTO accounts(companyName, managerID,companyToken) VALUES'+ "('" +req.body.company + "','"+ managerHash +"','"+ companyTokenHash+"')";
			companyDb.run(createCompany);
		});
		res.redirect('http://localhost/dashboard.html');
		
	}

	

});


var projectList = new Array(10); 
var projectUserList = new Array(10);
var howmanyfunc = 0;

app.post('/getProjects/users', function(req,res){ 
	var findProject = "SELECT * FROM projects WHERE userID = '" + req.body.userID + "' AND companyToken = '" + req.body.companyToken+ "'";
	
	projectDb.all(findProject, function(err,rows){

		for(var i =0; i<rows.length; i++){
			projectUserList[i] = new Array(10);
			for(var j = 0; j<10;j++){
				projectUserList[i][j] = new Array(10);
			}
		}
		for(var x = 0; x<rows.length; x++){
			projectList[x] = rows[x].projectName; 
			
		}

		var funcs = new Array();
		for(y=0; y<rows.length;y++){
			var projectName = projectList[y]; 
			//console.log('access projectname ' + projectName);
			funcs.push(createfunc(projectName, y, rows, res));
			funcs[y]();
		
		}
		
	}); 
	
});

function checkIfDone(rows, res){
	if(howmanyfunc>=rows.length){
		var obj = {proj: projectList, projusers: projectUserList};
		
		res.json(obj);
	}
}

function createfunc(projectName, y, rows, res) {
	return function(){ 
		co(function*() {
			var db = yield sqliteConnect(projectName+".db");
			var userResult = yield db.all('SELECT * FROM users');

			for(var x = 0; x<userResult.length;x++){
				projectUserList[y][x][0] = userResult[x].userID; 
				projectUserList[y][x][1] = userResult[x].name;
				projectUserList[y][x][2] = userResult[x].email;
				projectUserList[y][x][3] = userResult[x].companyToken;  
				projectUserList[y][x][4] = userResult[x].role;
				
			}
			howmanyfunc++;
			checkIfDone(rows, res);
		}).catch(function(err){
			console.log(err.stack); 
		});
	};
}

app.post('/createProject', function(req,res){

	var CreateDB = new sqlite3.Database('./'+req.body.projectName+'.db');
	CreateDB.serialize(function(){
		var createProjectInfo = "CREATE TABLE 'info' (`managerID` TEXT, `userID` TEXT, `projectID` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`projectName`TEXT,`projectDescription` TEXT)";
		var createUsers = "CREATE TABLE 'users' (`userID` TEXT, `name` TEXT, `email` TEXT, `companyToken` TEXT)";
		var createRequirements = "CREATE TABLE 'Requirements' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createDesign = "CREATE TABLE 'Design' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createImplementation = "CREATE TABLE 'Implementation' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createVerification = "CREATE TABLE 'Verification' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createMaintanence = "CREATE TABLE 'Maintanence' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		CreateDB.run(createProjectInfo);
		CreateDB.run(createRequirements);
		CreateDB.run(createDesign);
		CreateDB.run(createImplementation);
		CreateDB.run(createVerification);
		CreateDB.run(createMaintanence); 
		CreateDB.run(createUsers); 
	});
	CreateDB.serialize(function(){
		var infoSubmit = "INSERT INTO info(managerID, projectName, projectDescription) VALUES ('" + req.body.userID + "','" + req.body.projectName + "','"+ req.body.projectDescription+"')";
		CreateDB.run(infoSubmit); 
		var userSubmit = "INSERT INTO users(userID, name, companyToken) VALUES ('"+req.body.userID+ "','"+ req.body.username+ "','"+req.body.companyToken + "')";
		CreateDB.run(userSubmit); 
	});
	projectDb.serialize(function(){ 
		var submitName  = "INSERT INTO projects (projectName,userID,email, companyToken) VALUES ('" + req.body.projectName + "','"+ req.body.userID+ "','"+req.body.email+"','"+req.body.companyToken+ "')";
		projectDb.run(submitName); 

		});
	 
});

app.post('/createProject/addUser', function(req,res){
	var projectName = req.body.projectName;
	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO users(userID, name, companyToken) VALUES ('"+req.body.userID+ "','"+ req.body.username+ "','"+req.body.companyToken + "')");

	}).catch(function(err){
		console.log(err.stack);
	});

	});


app.post('/projectTask', function(err,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Requirements (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
	}).catch(function(err){
		console.log(err.stack);
	});

});

app.post('/updateTask/Requirements', function(err,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Design (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Requirements WHERE taskInfo = "+ req.body.taskInfo);
	}).catch(function(err){
		console.log(err.stack);
	});
}); 

app.post('/updateTask/design', function(err,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Implementation (taskInfo,userID,status,companyToken) VALUES '" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Design WHERE taskInfo = "+ req.body.taskInfo);
	}).catch(function(err){
		console.log(err.stack);
	});
}); 
app.post('/updateTask/implementation', function(err,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Verification (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Implementation WHERE taskInfo = "+ req.body.taskInfo);
	}).catch(function(err){
		console.log(err.stack);
	});
}); 

app.post('/updateTask/verification', function(err,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Maintenance (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.userID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Verification WHERE taskInfo = "+ req.body.taskInfo);
	}).catch(function(err){
		console.log(err.stack);
	});
}); 

app.delete('/projectDelete', function(err,rows){
	
	var projectName = req.body.projectName;

		co(function*() {
			var db = yield sqliteConnect(projectName+".db");
			yield db.run("DELETE FROM 'Maintanence' WHERE taskInfo = "+ req.body.taskInfo);
		}).catch(function(err){
			console.log(err.stack);
		});

});


