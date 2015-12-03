var useridtoken = null;
var token = "Notsetyet";
getToken();


function getToken(){        
	var URI = 'http://localhost:8081/login';
	$.getJSON(URI, function(results){
    		useridtoken = results.userID;
    		token = results;
    		if(token==null){
    			token="Notsetyet";
    		}
    	companytoken = token.companyToken;
	    getTodoList(); 
	   	getCalendar();
	   	getProjects();
	   	getCompanyInfo();
	    name = token.name;
	    email = token.email;
	    ismanager = (token.role=="manager")?true:false;
	    getProjectsTasks();
	    putInfo();
	});
} 

function logout(){        
	var URI = 'http://localhost:8081/logout';
	$.getJSON(URI, function(results){
	});
} 

function getCompanyInfo(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/companyInfo",
		data:{companyToken: companytoken},
		success:function(result){
			//ADD CODE TO ADD TO COMPANY DIRECTORY PAGE
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
}

function getProjects(){  

	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjects/users",
		data: {userID: useridtoken, companyToken: companytoken},
		success: function(result){
			var temp = result;
	    		projects = new Array();
	    		textprojects = "";
	    		for(var i =0; i<temp.proj.length; i++){
	    			if(temp.projusers[i]===null)
	    			 		continue;
	    			 var temp2 = new Object();
	    			 temp2.name = temp.proj[i];
	    			 textprojects+=temp.proj[i]+";";
	    			 temp2.users = new Array();
	    			 for(var y =0; y<temp.projusers.length; y++){
	    			 	if(temp.projusers[i][y]===null||temp.projusers[i][y][1]===null)
	    			 		continue;
	    			 	temp2.users.push(temp.projusers[i][y][1]+";"+temp.projusers[i][y][2]+";"+temp.projusers[i][y][4]);
	    			 }
	    			 projects.push(temp2);
	    		}
	    		textprojects = textprojects.substring(0, textprojects.length-1);
	    		putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 

function getProjectsTasks(){  
	getTaskMain();
	getTaskVerf();
	getTaskReq();
	getTaskDes();
	getTaskImp();
	getTaskComp();
}

function getTaskMain(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/maintenance",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			maintenance = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 
function getTaskVerf(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/verification",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			verification = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 

function getTaskReq(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/requirements",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			requirements = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 
function getTaskDes(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/design",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			design = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 
function getTaskImp(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/implementation",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			implementation = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 
function getTaskComp(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjectTasks/complete",
		data: {projectName: getCookie("ProjectSelected")},
		success: function(result){
			complete = JSON.parse(result);
			putInfo();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 




function getTodoList(){        
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/gettodo",
		data: {userid: useridtoken},
		success: function(result){
			todo = result.tasklist;
			updateTodoHtml();
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
		data: {userid: useridtoken, calendarinfo: objstring},
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
		url:"http://localhost:8081/getCalendar",
		data: {userid: useridtoken},
		success: function(result){
			temp = JSON.parse(result.calendarInformation);
			calendarevents = temp.info;
			updateCalendarHtml();
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
	});
} 

function newTask(pn, pd){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/projectTask",
		data: {taskInfo: pn, taskuserID: pd, email: token.email, companyToken: token.companyToken, projectName: getCookie("ProjectSelected")},
		success: function(result){
			alert("It updated!");
		},
		error:function(result){
			alert("fail " + result.responseText);
		}

	});
}

function newProject(pn, pd){
	console.log("New Project");
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

function newUser(pn, un){
	//nowhere for actual name
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/createProject/addUser",
		data: {userID: useridtoken, name: un, companyToken: token.companyToken, projectName: pn, status: "Good"},
		success: function(result){
			alert("It updated!");
			window.location.reload();
		},
		error:function(result){
			alert("There is no user with that name"); //fix later
		}

	});
}

function moveRequire(tn, tu, ts, projectName){
	//userID? again
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/updateTask/Requirements",
		data: {userID: useridtoken, name: tu, companyToken: token.companyToken, taskInfo: tn, status: ts, projectName: projectName},
		success: function(result){
			alert("It updated!");
			window.location.reload();
		},
		error:function(result){
			alert("There is no user with that name"); //fix later
		}

	});
}

function moveTask(tn, tu, ts, projectName,  what){
	//userID? again
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/updateTask/"+what,
		data: {userID: useridtoken, name: tu, companyToken: token.companyToken, taskInfo: tn, status: ts, projectName:projectName},
		success: function(result){
			alert("It updated!");
			window.location.reload();
		},
		error:function(result){
			alert("There is no user with that name"); //fix later
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

function updateCalendarHtml(){
	$(".full-calendar-demo").html();
	var cal, calendarDate, d, m, y;
      
        this.setDraggableEvents = function() {
          return $("#events .external-event").each(function() {
            var eventObject;
            eventObject = {
              title: $.trim($(this).text())
            };
            $(this).data("eventObject", eventObject);
            return $(this).draggable({
              zIndex: 999,
              revert: true,
              revertDuration: 0
            });
          });
        };
      
        setDraggableEvents();
      
        calendarDate = new Date();
      
        d = calendarDate.getDate();
      
        m = calendarDate.getMonth();
      
        y = calendarDate.getFullYear();
	cal = $(".full-calendar-demo").fullCalendar({
          header: {
            center: "title",
            left: "basicDay,basicWeek,month",
            right: "prev,today,next"
          },
          buttonText: {
            prev: "<span class=\"icon-chevron-left\"></span>",
            next: "<span class=\"icon-chevron-right\"></span>",
            today: "Today",
            basicDay: "Day",
            basicWeek: "Week",
            month: "Month"
          },
          droppable: true,
          editable: true,
          selectable: true,
          select: function(start, end, allDay) {
            return bootbox.dialog({
			title: "New Event",
			message: '<div class="row">  ' +
			    '<div class="col-md-12"> ' +
			    '<form class="form-horizontal"> ' +
			    '<div class="form-group"> ' +
			    '<label class="col-md-4 control-label" for="name">Event Name</label> ' +
			    '<div class="col-md-4"> ' +
			    '<input id="name" name="name" type="text" placeholder="Event Name" class="form-control input-md"> ' +
			    '<span class="help-block">Here goes the title of your event</span> </div> ' +
			    '</div> ' +
			    '<div class="form-group"> ' +
			    '<label class="col-md-4 control-label" for="name">Start Date</label> ' +
			    '<div class="col-md-4"> ' +
			    '<input id="startdate" name="startdate" type="text" placeholder="01/01/2015 5:00pm" class="form-control input-md"> ' +
			    '</div> ' +
			    '</div> ' +
			    '<div class="form-group"> ' +
			    '<label class="col-md-4 control-label" for="name">End Date</label> ' +
			    '<div class="col-md-4"> ' +
			    '<input id="enddate" name="enddate" type="text" placeholder="01/01/201 9:00pm" class="form-control input-md"> ' +
			    '</div> ' +
			    '</div> ' +
			    '</form> </div>  </div>',
			buttons: {
			    success: {
				label: "Save",
				className: "btn-success",
				callback: function () {
				    var title = $('#name').val();
				    var start = Date.parse($('#startdate').val());
				    var end = Date.parse($('#enddate').val());
				    var allDay = false;
				    if (title !== null) {
					cal.fullCalendar("renderEvent", {
					  title: title,
					  start: start,
					  end: end,
					  allDay: allDay
					}, true);
					var temp2 = cal.fullCalendar('unselect');
					updateCalendar();
					return temp2;
				  }
				}
			    }
			}
		    }
		);
          },
          eventClick: function(calEvent, jsEvent, view) {
            return bootbox.dialog({
              message: $("<form class='form'><label>Change event name</label></form><input id='new-event-title' class='form-control' type='text' value='" + calEvent.title + "' /> "),
              buttons: {
                "delete": {
                  label: "<i class='icon-trash'></i> Delete Event",
                  className: "pull-left",
                  callback: function() {
                    return cal.fullCalendar("removeEvents", function(ev) {
                      return ev._id === calEvent._id;
                    });
                  }
                },
                success: {
                  label: "<i class='icon-save'></i> Save",
                  className: "btn-success",
                  callback: function() {
                    calEvent.title = $("#new-event-title").val();
                    var temp = cal.fullCalendar('updateEvent', calEvent);
                    updateCalendar();
                    return temp;
                  }
                }
              }
            });
          },
          drop: function(date, allDay) {
            var copiedEventObject, eventClass, originalEventObject;
            originalEventObject = $(this).data("eventObject");
            originalEventObject.id = Math.floor(Math.random() * 99999);
            eventClass = $(this).attr('data-event-class');
            console.log(originalEventObject);
            copiedEventObject = $.extend({}, originalEventObject);
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            if (eventClass) {
              copiedEventObject["className"] = [eventClass];
            }
            $(".full-calendar-demo").fullCalendar("renderEvent", copiedEventObject, true);
            if ($("#calendar-remove-after-drop").is(":checked")) {
              return $(this).remove();
            }
          },
          events: calendarevents
        });

}
