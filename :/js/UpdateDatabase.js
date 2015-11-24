var useridtoken = null;
var token = null;

function getToken(){        
	var URI = 'http://localhost:8081/login';
	$.getJSON(URI, function(results){
    		useridtoken = results.userID;
    		token = results;
	});
} 

getToken();
function getTodoList(){        
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/gettodo",
		data: {userid: useridtoken},
		success: function(result){
			todo = result.tasklist;
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 

function updateTodoList(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/todo",
		data: {userid: useridtoken, todolist: todo},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

function updateCalendar(){
	var calendarinfo = $(".full-calendar-demo").fullCalendar( 'clientEvents');
	var reformattedcalendar = new Array();
	for(var i = 0; i<calendarinfo.length; i++){
		var temp2 = new Object();
		temp2.id = calendarinfo[i].id;
		temp2.title = calendarinfo[i].title;
		temp2.start = calendarinfo[i].start;
		temp2.end = calendarinfo[i].end;
		temp2.className = calendarinfo[i].className[0];
		temp2.allDay = calendarinfo[i].allDay;
		reformattedcalendar.push(temp2);
	}
	var objectholder = new Object();
	objectholder.info = reformattedcalendar;
	var objstring = JSON.stringify(objectholder);
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/calendar",
		data: {userid: userid, calendarinfo: objstring},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

function getCalendar(){        
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getcalendar",
		data: {userid: useridtoken},
		success: function(result){
			
			temp = JSON.parse(result.calendarinfo);
			calendarevents = temp.info;
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 

function newProject(pn, pd){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/createProject",
		data: {userID: useridtoken, name: token.name, email: token.email, companyToken: token.companyToken, projectName: pn, projectDescription: pd},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

function deleteProject(pn, pd){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/projectDelete",
		data: {userID: useridtoken, projectName: pn},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

