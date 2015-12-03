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
var promise = require('promise');
const SqliteJson = require('sqlite-json');



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
	var deleteTask = "DELETE FROM todo WHERE userID = '" + req.body.userid+ "'";

	var submitTask = 'INSERT INTO todo (userID, tasklist) VALUES' + "('"+req.body.userid+ "','" +req.body.todolist+ "')";
	companyDb.serialize(function(){
	companyDb.run(deleteTask);
		companyDb.serialize(function(){
			companyDb.run(submitTask);	
		});

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
		var DeleteCalendar = "DELETE FROM calendar WHERE userID = '"+ req.body.userid+"'";
		console.log(DeleteCalendar);
		companyDb.run(DeleteCalendar);
		var submitCalendar = 'INSERT INTO calendar (userID, calendarInformation) VALUES' + "('"+ req.body.userid + "','"+req.body.calendarinfo +"')";
		companyDb.run(submitCalendar);
		res.redirect(200,'http://localhost/dashboard.html');
	});
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
		companyDb.serialize(function(){
				var createuser = 'INSERT INTO users (name, email, password, role, userID, companyToken) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + userHash+ "','"+ req.body.token+ "')";
				companyDb.run(createuser);
				var todoInsert = "INSERT INTO todo (userID, tasklist) VALUES ('"+userHash+"', 'Add your first To-Do item now!;')";
				var temp = {"info":[{"id":"event1","title":"Automatically Imported Event","start":"2015-11-01T19:00:00.000Z","end":null,"className":"event-orange","allDay":true},{"id":"event2","title":"What not to do at a stop light?","start":"2015-11-05T20:00:00.000Z","end":null,"className":"event-red","allDay":true},{"id":"event3","title":"Fiesta Party","start":"2015-11-16T15:00:00.000Z","end":"2015-11-16T18:30:00.000Z","className":"event-purple","allDay":false},{"title":"Work","start":"2015-12-09T20:00:00.000Z","end":null,"allDay":false},{"title":"Subway","start":"2015-12-03T15:00:00.000Z","end":"2015-12-05T15:00:00.000Z","allDay":false},{"title":"Birthday","start":"2015-12-23T10:00:00.000Z","end":null,"allDay":false},{"title":"teas","start":"2015-12-18T05:00:00.000Z","end":null,"allDay":false}]};
				var calendarInsert = "INSERT INTO calendar (userID,calendarInformation) VALUES ('"+userHash+"','" + JSON.stringify(temp)+"')";  
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
		var createManager = 'INSERT INTO users (name, email, password, role, userID,companyToken, companyName) VALUES' +  "('" + req.body.name + "','" + req.body.email + "','" + hash + "','" +req.body.title+"','" + managerHash+"','" +companyTokenHash+"','"+ req.body.company+"')";
			console.log("\n\n\n"+createManager);
			companyDb.run(createManager);
		});
		companyDb.serialize(function(){
			var todoInsert = "INSERT INTO todo (userID) VALUES ('"+hash+"')";
			companyDb.run(todoInsert);
		});
		companyDb.serialize(function(){
			var temp = {"info":[{"id":"event1","title":"Automatically Imported Event","start":"2015-11-01T04:00:00.000Z","end":null,"className":"event-orange","allDay":true},{"id":"event2","title":"What not to do at a stop light?","start":"2015-11-05T05:00:00.000Z","end":null,"className":"event-red","allDay":true},{"id":"event3","title":"Fiesta Party","start":"2015-11-16T00:00:00.000Z","end":"2015-11-16T03:30:00.000Z","className":"event-purple","allDay":false},{"title":"Work","start":"2015-12-09T05:00:00.000Z","end":null,"allDay":false}]};
			var calendarInsert = "INSERT INTO calendar (userID,calendarInformation) VALUES ('"+managerHash+"','" + JSON.stringify(temp)+"')";  
			companyDb.run(calendarInsert);
		});
		companyDb.serialize(function(){
			var createCompany = 'INSERT INTO accounts(companyName, managerID,companyToken) VALUES'+ "('" +req.body.company + "','"+ managerHash +"','"+ companyTokenHash+"')";
			companyDb.run(createCompany);
		});
		res.redirect('http://localhost/dashboard.html');
		
	}

	

});

app.post('/companyInfo',function(req,res){
	var SQLQuery = "SELECT * FROM users WHERE companyToken = '"+req.body.companyToken+"'";
	companyDb.all(SQLQuery,function(err,row){
		console.log(row);
		res.json(row);
	});
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
		howmanyfunc = 0;
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
		var createUsers = "CREATE TABLE 'users' (`userID` TEXT, `name` TEXT, `email` TEXT, `companyToken` TEXT, `role` TEXT)";
		var createRequirements = "CREATE TABLE 'Requirements' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createDesign = "CREATE TABLE 'Design' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createImplementation = "CREATE TABLE 'Implementation' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createVerification = "CREATE TABLE 'Verification' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createMaintenance = "CREATE TABLE 'Maintenance' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var createComplete = "CREATE TABLE 'Complete' (`taskID`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`taskInfo`	TEXT,`userID`	TEXT,'status'    TEXT,`companyToken`	TEXT)";
		var CodeEditor = "CREATE TABLE 'EditorFiles' (`textfile` TEXT)";
		CreateDB.run(createProjectInfo);
		CreateDB.run(createRequirements);
		CreateDB.run(createDesign);
		CreateDB.run(createImplementation);
		CreateDB.run(createVerification);
		CreateDB.run(createMaintenance); 
		CreateDB.run(createUsers); 
		CreateDB.run(CodeEditor);
		CreateDB.run(createComplete); 
	});
	CreateDB.serialize(function(){
		var infoSubmit = "INSERT INTO info(managerID, projectName, projectDescription) VALUES ('" + req.body.userID + "','" + req.body.projectName + "','"+ req.body.projectDescription+"')";
		CreateDB.run(infoSubmit); 
		var userSubmit = "INSERT INTO users(userID, name,email, companyToken,role) VALUES ('"+req.body.userID+ "','"+ req.body.name+ "','"+ req.body.email+"','"+req.body.companyToken + "','manager')";
		CreateDB.run(userSubmit); 
	});
	projectDb.serialize(function(){ 
		var submitName  = "INSERT INTO projects (projectName,userID,email, companyToken) VALUES ('" + req.body.projectName + "','"+ req.body.userID+ "','"+req.body.email+"','"+req.body.companyToken+ "')";
		projectDb.run(submitName); 

		});
	 
});

app.post('/createProject/addUser', function(req,res){
	var projectName = req.body.projectName;
	var getuser = 'SELECT * FROM users WHERE email = '+ "'"+ req.body.email+ "'";
	companyDb.get(getuser, function(err,row){
	co(function*() {

		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO users(userID, name,email, companyToken, role) VALUES ('"+row.userID+ "','"+ row.name+ "','"+req.body.email+"','"+row.companyToken +"','developer')");

	}).catch(function(err){
		console.log(err.stack);
	});
});
res.redirect('http://localhost/dashboard.html');
});

	var Requirements; 
	var Design;
	var Implementation; 
	var Verification;
	var Maintenance; 
	var Complete;
app.post('/getProjectTasks/requirements', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Requirements',function(err,json){
		Requirements = json; 
		
		res.json(Requirements);
	});
});
app.post('/getProjectTasks/design', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Design',function(err,json){
		Design = json; 
		
		res.json(Design);
	});
});
app.post('/getProjectTasks/implementation', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	console.log(db);
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Implementation',function(err,json){
		Implementation = json; 
		
		res.json(Implementation);
	});
});
app.post('/getProjectTasks/verification', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Verification',function(err,json){
		Verification = json; 
		
		res.json(Verification);
	});
});
app.post('/getProjectTasks/maintenance', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	console.log(db);
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Maintenance',function(err,json){
		maintenance = json; 
		
		res.json(maintenance);
	});
});

app.post('/getProjectTasks/complete', function(req,res){
	projectName = req.body.projectName; 
	var db = new sqlite3.Database('./'+projectName+'.db');
	const exporter = SqliteJson(db);
	exporter.json('SELECT * FROM Complete',function(err,json){
		Complete = json; 
		
		res.json(Complete);
	});
});

app.post('/projectTask', function(req,res){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Requirements (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.taskuserID+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		
	}).catch(function(err){
		console.log(err.stack);
	});

	res.redirect('http://localhost/projects.html');

});

app.post('/projectTask/addTextFile', function(req,res){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO EditorFiles (textfile) VALUES ('" +req.body.textfile+"')");
		
	}).catch(function(err){
		console.log(err.stack);
	});

});


app.post('/updateTask/Requirements', function(req,rows){
	var projectName = req.body.projectName;
	console.log(projectName);
	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Design (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.name+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Requirements WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
}); 

app.post('/updateTask/design', function(req,rows){
	var projectName = req.body.projectName;


	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Implementation (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.name+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		console.log("DELETE FROM Design WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Design WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
}); 
app.post('/updateTask/implementation', function(req,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Verification (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.name+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Implementation WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
}); 

app.post('/updateTask/verification', function(req,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Maintenance (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.name+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Verification WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
}); 


app.post('/updateTask/maintenance', function(req,rows){
	var projectName = req.body.projectName;

	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("INSERT INTO Complete (taskInfo,userID,status,companyToken) VALUES ('" +req.body.taskInfo+"','"+ req.body.name+ "','"+"Incomplete"+ "','"+ req.body.companyToken+"')");
		yield db.run("DELETE FROM Maintenance WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
}); 

app.delete('/updateTask/taskdelete',function(req,res){
		var projectName = req.body.projectName;


	co(function*() {
		var db = yield sqliteConnect(projectName+".db");
		yield db.run("DELETE FROM Requirements WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Design WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Implementation WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Verification WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Maintenance WHERE taskInfo = '"+ req.body.taskInfo+"'");
		yield db.run("DELETE FROM Complete WHERE taskInfo = '"+ req.body.taskInfo+"'");
	}).catch(function(err){
		console.log(err.stack);
	});
	res.redirect('http://localhost/projects.html');
});

app.delete('/projectDelete', function(req,rows){

	var remove = 'DELETE FROM projects WHERE projectName = '+ "'"+ req.body.projectName+ "'";
	projectDb.run(remove);	

});


