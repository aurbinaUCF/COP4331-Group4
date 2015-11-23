//Im going to clean this up soon just ask me if you have any questions
//it's really dirty right now
var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var token = "A8asd8DH";
var bio = "This is a quick little bio section about me John Doe.";
//redo textprojects
var textprojects = "Project1-readme.txt-anothersampletext.txt-text3.txt;Project2-textfile.txt";
var projects = new Array();
var temporary = new Object();
temporary.name = "Project1";
temporary.users = new Array();
temporary.users.push("Jim;Jim@knights;warning");
temporary.users.push("Jimbo;Jimbo@knights;warning");
temporary.users.push("Jimba;Jimba@knights;warning");
temporary.files = new Array();
temporary.files.push("readme.txt");
temporary.files.push("anothersampletext.txt");
temporary.files.push("text3.txt");
projects.push(temporary);
temporary = new Object();
temporary.name = "Project2";
temporary.users = new Array();
temporary.users.push("Jim2;Jim@knights;warning");
temporary.users.push("Jimbo2;Jimbo@knights;warning");
temporary.users.push("Jimba2;Jimba@knights;warning");
temporary.files = new Array();
temporary.files.push("textfile.txt");
projects.push(temporary);

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
			token = "A8asd8DH";
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
			token = "Casd41C";
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
			token = "A8asd8DH";
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
var projnavbegin = "<li class=''><a onClick='setProject(\"";
// href=''><i class='icon-edit'></i><span>Proj2</span></a></li>
var projnavmiddle = "\")' href='dashboardProjectTabs.html'><i class='icon-edit'></i><span>";
var projnavend =  "</span></a></li>";
//var projnavbegin = "<li class=''><a class='dropdown-collapse' onClick='setProject(\"";
var texteditprojnavbegin = "<li class='active'><a class='dropdown-collapse' onClick='setProject(\"";
//var projnavmiddle = "\")' href='#'><i class='icon-caret-right'></i><span>";
//var projnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked'><li class=''><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";
var texteditprojnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked in'><li class='active'><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";

var projectfiles = new Array();

function setProject(projname){
	setCookie("ProjectSelected", projname, 1);
	setCookie('FileEditing', 'Need', 1)
}

$('document').ready(function(){
	putInfo();
});

var tablebefore = "<div class='responsive-table'> <div class='scrollable-area'> <table class='data-table-column-filter table table-bordered table-striped' style='margin-bottom:0;'> <thead> <tr> <th> Task </th> <th> User(s) in charge </th> <th> Status </th> <th></th> </tr></thead> <tbody>";

var tableafter = "</tbody> <tfoot> <tr> <th>Name</th> <th>User(s) in charge</th> <th colspan='2'>Status</th> </tr></tfoot> </table> </div></div>";

var requirements = new Array();
requirements.push("Task1;Whoisdoingit;warning");
requirements.push("Task2;Whoisdoingit2;warning");
requirements.push("Task3;Whoisdoingit2;warning");

var design = new Array();
design.push("DesignTask1;Whoisdoingit;warning");
design.push("DesignTask2;Whoisdoingit2;warning");
design.push("DesignTask3;Whoisdoingit2;warning");

var implementation = new Array();
implementation.push("ImplemTask1;Whoisdoingit;warning");
implementation.push("ImplemTask2;Whoisdoingit2;warning");
implementation.push("ImplemTask3;Whoisdoingit2;warning");

var verification = new Array();
verification.push("VerifTask1;Whoisdoingit;warning");
verification.push("VerifTask2;Whoisdoingit2;warning");
verification.push("VerifTask3;Whoisdoingit2;warning");

var maintenance = new Array();
maintenance.push("MainTask1;Whoisdoingit;warning");
maintenance.push("MainTask2;Whoisdoingit2;warning");
maintenance.push("MainTask3;Whoisdoingit2;warning");

var projusers = new Array();
projusers.push("Manager;User1;Email");
projusers.push("Developer;User2;Email");
projusers.push("Developer;User3;Email");
var projtags = "";
var projdata = "";

function putInfo(){

	if(getCookie("User")===undefined){
		setCookie("User", "2", 1);
	}
	testMode(parseInt(getCookie("User")));	
	
	$('.user-name:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(name);
	$('.user-name:not(input)').html(name);	

	$('.putname:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(name);
	$('.putname:not(input)').html(name);

	$('.putemail:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(email);
	$('.putemail:not(input)').html(email);

	$('.putcompany:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(company);
	$('.putcompany:not(input)').html(company);

	$('.puttoken:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(token);
	$('.puttoken:not(input)').html(token);
	
	$('.profilepic').attr('src', profilepic);
	$('.putprofilepic').attr('src', profilepic);

	$('.putbio:not(div, span, p, h1,h2,h3,h4,h5,h6)').val(bio);
	$('.putbio:not(input)').html(bio);

	if(!ismanager)
		$('.manageronly').hide();
	
	var todosplit = todo.split(";");
	var todoelements="";	
	for(var i = 0; i<todosplit.length; i++){
		todoelements+=(todobeginning+" "+todosplit[i]+todoending);
	}
	$('#todoelements').html(todoelements);

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
			normalprojects += (projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			for(var y = 1; y<textsplit.length; y++){
				projectfiles.push(textsplit[y]);
			}
		} else {
			//$('#projects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			//$('#texteditorprojects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);				
			texteditorprojects += (projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			normalprojects += (projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
		}
		$('#texteditorprojects').html(texteditorprojects);
		$('#projects').html("<li class='active'><a href='dashboard.html'><i class='icon-dashboard'></i><span>Dashboard</span></a></li>"+normalprojects);
			
	}	
	
	//Put
	
	for(var i = 0; i<projects.length; i++){
		var newprojname = projects[i].name;
		var temp = "<li class='"+((i==0)?"active":"")+"'><a data-toggle='tab' href='#"+newprojname+"'>"+newprojname+"</a></li>";
		var temp2 = ((i==0)?"<div class='tab-content'>":"")+"<div id="+newprojname+" class='tab-pane "+((i==0)?"active":"")+"'> <div class='row'><div class='col-sm-12'> <div class='box bordered-box orange-border' style='margin-bottom:0;'> <div class='box-header dark-background'> <div class='title'>Users</div><div class='actions'><a class='btn box-remove btn-xs btn-link' href='#'><i class='icon-remove'></i></a><a class='btn box-collapse btn-xs btn-link' href='#'><i></i></a> </div></div><div class='box-content box-no-padding'>"; 
		//users
		temp4 = "";
		for(var j = 0; j<projects[i].users.length; j++){
			var rtemp = projects[i].users[j].split(";");
			temp4 += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
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
	console.log(projtags);
	console.log(projdata);
	//Put Requirements
	var temp = "";
	for(var i = 0; i<requirements.length; i++){
		var rtemp = requirements[i].split(";");
		temp += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putrequirements').html(tablebefore+temp+tableafter);
	
	//Put Design
	temp = "";
	for(var i = 0; i<design.length; i++){
		var rtemp = design[i].split(";");
		temp += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putdesign').html(tablebefore+temp+tableafter);
	
	//Put Implementatoin
	temp = "";
	for(var i = 0; i<implementation.length; i++){
		var rtemp = implementation[i].split(";");
		temp += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putimplementation').html(tablebefore+temp+tableafter);
	
	//Put Verification
	temp = "";
	for(var i = 0; i<verification.length; i++){
		var rtemp = verification[i].split(";");
		temp += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putverification').html(tablebefore+temp+tableafter);
	
	//Put Maintenance
	temp = "";
	for(var i = 0; i<maintenance.length; i++){
		var rtemp = maintenance[i].split(";");
		temp += "<tr> <td>"+rtemp[0]+"</td><td>"+rtemp[1]+"</td><td> <span class='label label-"+rtemp[2]+"'>"+rtemp[2]+"</span> </td><td> <div class='text-right'> <a class='btn btn-success btn-xs' href='#'> <i class='icon-ok'></i> </a> <a class='btn btn-danger btn-xs' href='#'> <i class='icon-remove'></i> </a> </div></td></tr>";
	}
	$('#putmaintenance').html(tablebefore+temp+tableafter);
	
	var temp = "";
	for(var i = 0; i<projects.length; i++){
		temp += "<li><a href='#' class='editprojlink'>"+projects[i].name+"</a></li>";
	}
	
	$('#putprojnames').html(temp);
	
	$('.editprojlink').click(function(){
		$('.editproj').html($(this).html()+"<span class='caret'></span>");
		$('.editprojhide').slideDown( "slow", function() {});
	});
	
	$('#newprojsubmit').click(function(){
		
		var newprojname = $("#newprojname").val();
		var temp = "<li class='active'><a data-toggle='tab' href='#"+newprojname+"'>"+newprojname+"</a></li>";
		var temp2 = "<div class='tab-content'> <div id="+newprojname+" class='tab-pane'> <div class='row'><div class='col-sm-12'> <div class='box bordered-box orange-border' style='margin-bottom:0;'> <div class='box-header dark-background'> <div class='title'>Users</div><div class='actions'><a class='btn box-remove btn-xs btn-link' href='#'><i class='icon-remove'></i></a><a class='btn box-collapse btn-xs btn-link' href='#'><i></i></a> </div></div><div class='box-content box-no-padding putprojusers'> </div></div></div></div></div></div>";
		$('#tabss').append(temp2);
		$('.nav-tabs').append(temp);
		//I'll have to refresh here
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
