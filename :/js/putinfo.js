//Im going to clean this up soon just ask me if you have any questions
//it's really dirty right now
var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var companytoken;
var bio = "This is a quick little bio section about me John Doe.";
//redo textprojects
var textprojects = "Project1-readme.txt-anothersampletext.txt-text3.txt;Project2-textfile.txt";
var projects = new Array();
var companytable = new Array();
var todo = "This is all put in from the javascript;Another Todo;The Last Todo";

var ismanager = true;

//$(".full-calendar-demo").fullCalendar('clientEvents');
calendarevents = [
            {
              id: "event1",
              title: "Automatically Imported Event",
              start: new Date(2015, 10, 1),
              className: 'event-orange'
            }, {
              id: "event2",
              title: "What not to do at a stop light?",
              start: new Date(2015, 10, 5),
              end: new Date(2015, 10, 2),
              className: "event-red"
            }, {
              id: "event3",
              title: "Fiesta Party",
              start: new Date(2015, 10, 15, 19, 0),
              end: new Date(2015, 10, 15, 22, 30),
              allDay: false,
              className: "event-purple"
            }
          ];

//testMode(2);

function testMode(which){
	switch(which){
		case 0:
			name = "John Doe";
			email = "JohnDoe@Knights.ucf.edu";
			company = "Random Company Inc";
			profilepic = "imgs/avatar.jpg";
			companytoken = "A8asd8DH";
			bio = "This is a quick little bio section about me John Doe.";	
			textprojects = "Project1-readme.txt-anothersampletext.txt-text3.txt;TheseAreDynammic-textfile.txt;Project3-textfile.txt";
			todo = "This is all put in from the javascript;Another Todo;The Last Todo";			
			ismanager = true;	
			setCookie("User", "0", 1);	
			break;
		case 1:
			name = "Granny G";
			email = "GrannyG@knights.ucf.edu";
			profilepic = "http://www.smartsandstamina.com/wp-content/uploads/2013/07/Grandma.jpg";
			companytoken = "Casd41C";
			bio = "This is a quick little bio section about me Granny G.";
			textprojects = "CatTakeover-HowToDealWith20Cats.txt-MyLifeWithTheCats.txt";
			setCookie("User", "1", 1);	
			todo = "Find my reading glasses;Cook for my Grandchildren;Feed Cats;Code program to take over the world";
			ismanager = false;		
			break;
		case 2:
			name = "Aang";
			email = "Aang@knights.ucf.edu";
			profilepic = "http://farm3.static.flickr.com/2567/3711527781_db9987ee83_o.jpg";
			companytoken = "A8asd8DH";
			bio = "While I still have a lot to learn before I save anyone, I believe I can save the world... through programming projects.";
			todo = "Master the elements;Defeat Fire Lord;Eat Egg Custard Tart";			
			setCookie("User", "2", 1);
			textprojects = "Waterbending-Howtobendwaves4Dummies.txt-Ancientwaterscroll.txt;EarthBending-UnderstandingTheGravityOfSituations.txt;Firebending-IgnitingYourInnerFlame.txt";	
			ismanager = true;		
			break;
	}
}

//this is for the individuals todos
var todobeginning = "<li class='item'><label class='check pull-left todo'><input type='checkbox'><span>";
var todoending = "</span></label><div class='actions pull-right'><a class='btn btn-link edit has-tooltip' data-placement='top' href='#' title='Edit todo'><i class='icon-pencil'></i></a><a class='btn btn-link remove has-tooltip' data-placement='top' href='#' title='Remove todo'><i class='icon-remove'></i></a><a class='btn btn-link important has-tooltip' data-placement='top' href='#' title='Mark as important'><i class='icon-bookmark-empty'></i></a></div></li>";

//Just to dynamically read the project files for right now
//Projects divided by collons
//files are designated by -
var projnavbegin = "'><a onClick='setProject(\"";
// href=''><i class='icon-edit'></i><span>Proj2</span></a></li>
var projnavmiddle = "\")' href='projects.html'><i class='icon-edit'></i><span>";
var projnavend =  "</span></a></li>";
//var projnavbegin = "<li class=''><a class='dropdown-collapse' onClick='setProject(\"";
var texteditprojnavbegin = "<li class='active'><a class='dropdown-collapse' onClick='setProject(\"";
//var projnavmiddle = "\")' href='#'><i class='icon-caret-right'></i><span>";
//var projnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked'><li class=''><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";
var texteditprojnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked in'><li class='active'><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";

var projectfiles = new Array();

function setProject(projname){
	setCookie("ProjectSelected", projname, 1);
	setCookie('FileEditing', 'Need', 1);
}

$('document').ready(function(){
	putInfo();
	if($('.projectname').length==1){
		$('.'+getCookie("ProjectSelected")).eq(0).addClass("active");
		$('.dashboardnav').eq(0).removeClass("active");
	}
});

var tablebefore = "<div class='responsive-table'> <div class=''> <table class='data-table-column-filter table table-bordered table-striped' style='margin-bottom:0;'> <thead> <tr> <th> Task </th> <th> User(s) in charge </th><th></th> </tr></thead> <tbody>";

var tableafter = "</tbody> </table> </div></div>";

var requirements = new Array();
var design = new Array();
var implementation = new Array();
var verification = new Array();
var maintenance = new Array();
var complete = new Array();

var projusers = new Array();
var projtags = "";
var projdata = "";

var selectedproj = "";

function updateTodoHtml(){
	var todosplit = todo.split(";");
	var todoelements="";	
	for(var i = 0; i<todosplit.length; i++){
		todoelements+=(todobeginning+" "+todosplit[i]+todoending);
	}
	$('#todoelements').html(todoelements);	
}

function putInfo(){

	//if(getCookie("User")===undefined){
	//	setCookie("User", "2", 1);
	//}
	//testMode(parseInt(getCookie("User")));	
	
	$('.user-name:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(name);
	$('.user-name:not(input)').html(name);	

	$('.putname:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(name);
	$('.putname:not(input)').html(name);

	$('.putemail:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(email);
	$('.putemail:not(input)').html(email);

	$('.putcompany:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(company);
	$('.putcompany:not(input)').html(company);

	$('.puttoken:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(companytoken);
	$('.puttoken:not(input)').html(companytoken);
	
	$('.profilepic').attr('src', profilepic);
	$('.putprofilepic').attr('src', profilepic);

	$('.putbio:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(bio);
	$('.putbio:not(input)').html(bio);

	if(!ismanager)
		$('.manageronly').hide();
	
	updateTodoHtml();

	var projectssplit = textprojects.split(";");
	var normalprojects="", texteditorprojects = "";	
	
	if(getCookie("ProjectSelected")!==undefined){
		$('.projectname').html(getCookie("ProjectSelected"));
	}
	
	for(var i = 0; i<projectssplit.length; i++){
		var textsplit = projectssplit[i].split("-");
		if(getCookie("ProjectSelected")===textsplit[0]){		
				
			//$('#texteditorprojects').append(texteditprojnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+texteditprojnavend);			
			texteditorprojects += (texteditprojnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+texteditprojnavend);
			//$('#projects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			normalprojects += ("<li class='"+textsplit[0]+projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			for(var y = 1; y<textsplit.length; y++){
				projectfiles.push(textsplit[y]);
			}
		} else {
			//$('#projects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			//$('#texteditorprojects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);				
			texteditorprojects += (projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			normalprojects += ("<li class='"+textsplit[0]+projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
		}
		$('#texteditorprojects').html(texteditorprojects);
		$('#projects').html("<li class='active dashboardnav'><a href='dashboard.html'><i class='icon-dashboard'></i><span>Dashboard</span></a></li> <li class=''><a href='company_page.html'><i class='icon-table'></i><span>Company Info</span></a></li>"+normalprojects);
		
	}	
	
	//Put
	projtags = "";
	projdata = "";
	for(var i = 0; i<projects.length; i++){
		var newprojname = projects[i].name.trim();
		console.log(newprojname);
		var temp = "<li class='"+((i==0)?"active":"")+"'><a data-toggle='tab' href='#"+newprojname+"'>"+newprojname+"</a></li>";
		var temp2 = ((i==0)?"<div class='tab-content'>":"")+"<div id="+newprojname+" class='tab-pane "+((i==0)?"active":"")+"'> <div class='row'><div class='col-sm-12'> <div class='box bordered-box orange-border' style='margin-bottom:0;'> <div class='box-header dark-background'> <div class='title'>Users</div><div class='actions'><a class='btn box-remove btn-xs btn-link' href='#'><i class='icon-remove'></i></a><a class='btn box-collapse btn-xs btn-link' href='#'><i></i></a> </div></div><div class='box-content box-no-padding'>"; 
		//users
		temp4 = "";
		for(var j = 0; j<projects[i].users.length; j++){
			var rtemp = projects[i].users[j].split(";");
			temp4 += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-danger btn-xs removeuser' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
		}
		var temp3 = "</div></div></div></div></div>";
		var temp5 = temp2+"<table class='data-table-column-filter table table-bordered table-striped' style='margin-bottom:0;'>"+temp4+"</table>"+temp3;
		//$('#tabss').append(temp5);
		//console.log(temp5);
		projtags += temp;
		projdata += temp5;
		//$('.nav-tabs').append(temp);
	}
	$('#tabss').html("<ul class='nav nav-responsive nav-tabs'><li class='active'>"+projtags+"</li></ul>"+projdata+"</div>");
	//console.log(projtags);
	//console.log(projdata);
	//Put Requirements
	var temp = "";
	var tasks = new Array(); 
	for(var i = 0; i<requirements.length; i++){
		var rtemp = requirements[i];
		tasks.push({name: rtemp.taskInfo, level: 0});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-success btn-xs requiremove has-tooltip' href='#' data-placement='top' data-original-title='Move To Next Section'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putrequirements').html(tablebefore+temp+tableafter);
	
	//Put Design
	temp = "";
	for(var i = 0; i<design.length; i++){
		var rtemp = design[i];
		tasks.push({name: rtemp.taskInfo, level: 1});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-success btn-xs designmove has-tooltip' href='#' data-placement='top' data-original-title='Move To Next Section'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putdesign').html(tablebefore+temp+tableafter);
	
	//Put Implementatoin
	temp = "";
	for(var i = 0; i<implementation.length; i++){
		var rtemp = implementation[i];
		tasks.push({name: rtemp.taskInfo, level: 2});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-success btn-xs implementmove has-tooltip' href='#' data-placement='top' data-original-title='Move To Next Section'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putimplementation').html(tablebefore+temp+tableafter);
	
	//Put Verification
	temp = "";
	for(var i = 0; i<verification.length; i++){
		var rtemp = verification[i];
		tasks.push({name: rtemp.taskInfo, level: 3});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-success btn-xs verifmove has-tooltip' href='#' data-placement='top' data-original-title='Move To Next Section'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putverification').html(tablebefore+temp+tableafter);
	
	//Put Maintenance
	temp = "";
	for(var i = 0; i<maintenance.length; i++){
		var rtemp = maintenance[i];
		tasks.push({name: rtemp.taskInfo, level: 4});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-success btn-xs maintainmove has-tooltip' href='#' data-placement='top' data-original-title='Move To Next Section'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putmaintenance').html(tablebefore+temp+tableafter);
	
	//Put Completed
	temp = "";
	for(var i = 0; i<complete.length; i++){
		var rtemp = complete[i];
		tasks.push({name: rtemp.taskInfo, level: 5});
		temp += "<tr> <td>"+rtemp.taskInfo+"</td><td>"+rtemp.userID+"</td><td> <div class='text-right'> <a class='btn btn-danger btn-xs deletetask has-tooltip' href='#' data-placement='top' data-original-title='Delete Task'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putcompleted').html(tablebefore+temp+tableafter);


	var temp = "";
	for(var i = 0; i<companytable.length; i++){
    	temp += "<tr><td>"+companytable[i].role+"</td><td>"+companytable[i].name+"</td><td>"+companytable[i].email+"</td></tr>"
	}
	$('#companytable').html(temp);
	
	console.log(tasks);
	temp = "";
	for(var i = 0; i<tasks.length; i++){
		temp+="<li><div class='task'><span class='pull-left'><a href='#'>";
		temp+=tasks[i].name;
		temp+="</a></span><small class='pull-right'>";
		temp+=tasks[i].level*20+"%";
		temp+="</small></div><div class='progress progress-small'><div class='progress-bar-success progress-bar' style='width:";
		temp+=tasks[i].level*20+"%";
		temp+= "'></div></div></li>";
	}
	$('.tasks').html(temp);
	
	
	var temp = "";
	for(var i = 0; i<projects.length; i++){
		temp += "<li><a href='#' class='editprojlink' id = '"+projects[i].name+"''>"+projects[i].name+"</a></li>";
	}
	
	$('#putprojnames').html(temp);
	
	$('.editprojlink').click(function(){
		selectedproj = $(this).html();
		$('.editproj').html(selectedproj+"<span class='caret'></span>");
		$('.editprojhide').slideDown( "slow", function() {});
		$('.editselectedproj').html(selectedproj);
	});
	
	$('#newprojsubmit').click(function(){
		if(clickedalready)
			return;
		else
			clickedalready = true;
		var newprojname = ($("#newprojname").val()).replace( /\s/g, "");
		var newprojdesc = $("#newprojdesc").val();
		var temp = "<li class=''><a data-toggle='tab' href='#"+newprojname+"'>"+newprojname+"</a></li>";
		var temp2 = "<div class='tab-content'> <div id="+newprojname+" class='tab-pane'> <div class='row'><div class='col-sm-12'> <div class='box bordered-box orange-border' style='margin-bottom:0;'> <div class='box-header dark-background'> <div class='title'>Users</div><div class='actions'><a class='btn box-remove btn-xs btn-link' href='#'><i class='icon-remove'></i></a><a class='btn box-collapse btn-xs btn-link' href='#'><i></i></a> </div></div><div class='box-content box-no-padding putprojusers'> </div></div></div></div></div></div>";
		$('#tabss').append(temp2);
		$('.nav-tabs').append(temp);
		
		newProject(newprojname, newprojdesc);
		//I'll have to refresh here
	});
	
	$('#newfilesubmit').click(function(){
		if(filealready)
			return;
		else
			filealready = true;
		var newusername = $("#newfilename").val();
		updateFile(newusername);
	});

	$('#newusersubmit').click(function(){
		if(addalready)
			return;
		else
			addalready = true;
		var newusername = $("#newusername").val();
		var projName = $('#tabss').find('.nav-tabs .active a').html();
		console.log(projName);
		newUser(projName,newusername);
	});
	
	$('#newtasksubmit').click(function(){
		if(taskalready)
			return;
		else
			taskalready = true;
		var newtaskname = $("#newtaskname").val();
		var newtaskusername = $("#newtaskusername").val();
		newTask(newtaskname, newtaskusername);
	});
	
	$('#deleteproject').click(function(){
		if(deletealready)
			return;
		else
			deletealready = true;
		deleteProject(selectedproj);
	});
	
	$('.requiremove').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"), "Requirements");
	});
	
	$('.designmove').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"),  "design");
	});
	
	$('.implementmove').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"),  "implementation");
	});
	
	$('.verifmove').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"),  "verification");
	});
	
	$('.maintainmove').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"),  "maintenance");
	});
	
	$('.deletetask').click(function(){
		var taskname = ($(this).parent().parent().parent().find("td").eq(0).html());
		var taskusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var taskstatus = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		moveTask(taskname, taskusername, taskstatus,getCookie("ProjectSelected"),  "taskdelete");
	});
	
	$('.remove').click(function(){
        var td = todo.split(";");
        var temp = "";
        for(var i = 0; i<td.length-1; i++){
            if(td[i]===$('.remove').parent().parent().find(".todo span").eq(0).html().substring(1))
                continue;
            temp+=td[i]+";";
        }
        if(td[td.length-1]!==$('.remove').parent().parent().find(".todo span").eq(0).html())
        temp+=td[td.length-1];
        todo = temp;
        updateTodoList();
    });
	$('.removeuser').click(function(){
		var projusername = ($(this).parent().parent().parent().find("td").eq(0).html());
		var projusername = ($(this).parent().parent().parent().find("td").eq(1).html());
		var projrole = ($(this).parent().parent().parent().find("td").eq(2).find("span").eq(0).html());
		
	});
	
	$('#signout').click(function(){
		logout();
	});
	
	
}

firsttime = true;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getHash(file){
	var hash = "";
	for(var i = 0; i<file.length; i++){
		hash+= String.fromCharCode('a'.charCodeAt(0) + file.charCodeAt(i)%11);
	}
    return hash;
}

var clickedalready = false;
var taskalready = false;
var deletealready = false;
var addalready = false;
var filealready = false; 
	

if(!String.prototype.trim){  
 String.prototype.trim = function(){  
   return this.replace(/^\s+|\s+$/g,'');  
 };  
}
