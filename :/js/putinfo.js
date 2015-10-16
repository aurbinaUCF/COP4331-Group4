var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var token = "A8asd8DH";
var bio = "This is a quick little bio section about me John Doe.";

var ismanager = true;

//this is for the individuals todos
var todobeginning = "<li class='item'><label class='check pull-left todo'><input type='checkbox'><span>";
var todoending = "</span></label><div class='actions pull-right'><a class='btn btn-link edit has-tooltip' data-placement='top' href='#' title='Edit todo'><i class='icon-pencil'></i></a><a class='btn btn-link remove has-tooltip' data-placement='top' href='#' title='Remove todo'><i class='icon-remove'></i></a><a class='btn btn-link important has-tooltip' data-placement='top' href='#' title='Mark as important'><i class='icon-bookmark-empty'></i></a></div></li>";
var todo = "This is all put in from the javascript;Another Todo;The Last Todo";

//Just to dynamically read the project files for right now
//Projects divided by collons
//files are designated by -
var projects = "Project1-readme.txt-anothersampletext.txt-text3.txt;TheseAreDynammic;Project3";
var projnavbegin = "<li class=''><a class='dropdown-collapse' onClick='setProject(\"";
var texteditprojnavbegin = "<li class='active'><a class='dropdown-collapse' onClick='setProject(\"";
var projnavmiddle = "\")' href='#'><i class='icon-caret-right'></i><span>";
var projnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked'><li class=''><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";
var texteditprojnavend ="</span><i class='icon-angle-down angle-down'></i></a><ul class='nav nav-stacked in'><li class='active'><a href='texteditor.html'><i class='icon-caret-right'></i><span>Edit Text</span></a></li></ul></li>";

function setProject(projname){
	setCookie("ProjectSelected", projname, 1);
}

$('document').ready(function(){
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
	for(var i = 0; i<todosplit.length; i++){
		$('#todoelements').append(todobeginning+" "+todosplit[i]+todoending);
	}

	var projectssplit = projects.split(";");
	for(var i = 0; i<projectssplit.length; i++){
		var textsplit = projectssplit[i].split("-");
		if(getCookie("ProjectSelected")===textsplit[0]){		
				
			$('#texteditorprojects').append(texteditprojnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+texteditprojnavend);			
			$('#projects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
		} else {
			$('#projects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);
			$('#texteditorprojects').append(projnavbegin+textsplit[0]+projnavmiddle+" "+textsplit[0]+projnavend);				
		}
		//for(var y = 1; y<textsplit.length; y++){
		//	$('#proj')
		//}
	}		

});

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
