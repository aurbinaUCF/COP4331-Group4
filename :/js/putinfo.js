var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var token = "A8asd8DH";
var bio = "This is a quick little bio section about me John Doe.";

var ismanager = true;
var todobeginning = "<li class='item'><label class='check pull-left todo'><input type='checkbox'><span>";
var todoending = "</span></label><div class='actions pull-right'><a class='btn btn-link edit has-tooltip' data-placement='top' href='#' title='Edit todo'><i class='icon-pencil'></i></a><a class='btn btn-link remove has-tooltip' data-placement='top' href='#' title='Remove todo'><i class='icon-remove'></i></a><a class='btn btn-link important has-tooltip' data-placement='top' href='#' title='Mark as important'><i class='icon-bookmark-empty'></i></a></div></li>";

var todo = "This is all put in from the javascript;Another Todo;The Last Todo";

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

});
