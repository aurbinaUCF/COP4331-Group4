var useridtoken = null;
var token = "Notsetyet";

function getToken(){        
	var URI = 'http://localhost:8081/login';
	$.getJSON(URI, function(results){
    		useridtoken = results.userID;
    		token = results;
    		if(token==null){
    			token="Notsetyet";
    		}
	    getTodoList(); 
	    getCalendar();
	    getProjects();
	    companytoken = token.companyToken;
	    name = token.name;
	    email = token.email;
	    ismanager = (token.role=="manager")?true:false;
	    putInfo();
	});
} 

function getProjects(){  

	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/getProjects/users",
		data: {userID: useridtoken, companyToken: companytoken},
		success: function(result){
			var temp = results;
	    		projects = new Array();
	    		for(var i =0; i<temp.proj.length; i++){
	    			 var temp2 = new Object();
	    			 temp2.name = temp.proj[i];
	    			 temp2.users = new Array();
	    			 for(var y =0; y<temp.projusers.length; y++){
	    			 	temp2.users.push(temp.projusers[y][1]+";"+temp.projusers[y][2]+";"+temp.projusers[y][4]);
	    			 }
	    			 projects.push(temp2);
	    		}
		},
		error:function(result){
			alert("fail " + result.responseText);
		}
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
		url:"http://localhost:8081/getcalendar",
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

function newUser(pn){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:8081/createProject/addUser",
		data: {userID: useridtoken, name: token.name, companyToken: token.companyToken, projectName: pn},
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
