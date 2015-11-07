var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var token = "A8asd8DH";
var bio = "This is a quick little bio section about me John Doe.";
var projects = "Project1-readme.txt-anothersampletext.txt-text3.txt;TheseAreDynammic-textfile.txt;Project3-textfile.txt";
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
			projects = "Project1-readme.txt-anothersampletext.txt-text3.txt;TheseAreDynammic-textfile.txt;Project3-textfile.txt";
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
			projects = "CatTakeover-HowToDealWith20Cats.txt-MyLifeWithTheCats.txt";
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
			projects = "Waterbending-Howtobendwaves4Dummies.txt-Ancientwaterscroll.txt;EarthBending-UnderstandingTheGravityOfSituations.txt;Firebending-IgnitingYourInnerFlame.txt";	
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
var projnavbegin = "<li class=''><a class='dropdown-collapse' onClick='setProject(\"";
var texteditprojnavbegin = "<li class='active'><a class='dropdown-collapse' onClick='setProject(\"";
var projnavmiddle = "\")' href='#'><i class='icon-caret-right'></i><span>";
var projnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked'><li class=''><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";
var texteditprojnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked in'><li class='active'><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";

var projectfiles = new Array();

function setProject(projname){
	setCookie("ProjectSelected", projname, 1);
	setCookie('FileEditing', 'Need', 1)
}

$('document').ready(function(){
	putInfo();
});

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

	var projectssplit = projects.split(";");
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
		$('#projects').html(normalprojects);
	}	
}

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
