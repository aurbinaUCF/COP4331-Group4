var userid = "randomuserid";

function updateTodoList(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/todo",
		data: {userid: userid, todolist: todo},
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
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/calendar",
		data: {userid: userid, calendarinfo: reformattedcalendar},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

