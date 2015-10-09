var formID = "#inputform";
var signupformID = "#signupform";

$(document).ready(function(){
	
	//login page submit
	$(formID).on('submit', function(e) { //use on if jQuery 1.7+
        	e.preventDefault();
		$.post( "localhost:8080/auth", {
    			username: $('#username').val(),
        		password: $('#password').val()
    		});
	});
	
	//Regular user sign up submit
	$(signupformID).on('submit', function(e) {
        	e.preventDefault();
		$.post( "localhost:8080/register", {
    			name: $('#name').val(),
    			username: $('#username').val(),
			email: $('#email').val(),
			company: $('#company').val(),
        		password: $('#password').val()
    		});
	});

	//Manager sign up submit
	$(msignupformID).on('submit', function(e) { 
        	e.preventDefault();
		$.post( "localhost:8080/register", {
    			name: $('#name').val(),
			username: $('#username').val(),
			email: $('#email').val(),
			token: $('#token').val(),
        		password: $('#password').val()
    		});
	});

});
