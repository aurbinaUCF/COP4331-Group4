(function() {
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
      
      }).call(this);
    
