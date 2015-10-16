var name = "John Doe";
var email = "JohnDoe@Knights.ucf.edu";
var company = "Random Company Inc";
var profilepic = "imgs/avatar.jpg";
var token = "A8asd8DH";
var ismanager = true;

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
	
	if(!ismanager)
		$('.manageronly').hide();
	
});
