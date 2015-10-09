var formID = "#inputform";
var signupformID = "#signupform";
var msignupformID = "#msignupform";

$(document).ready(function(){
	
	//login page submit
	$(formID).on('submit', function(e) { //use on if jQuery 1.7+
        	e.preventDefault();
		$.post( "localhost:8080/auth", {
    			email: $('#email').val(),
        		password: $('#password').val()
    		});
	});
	
	//Regular user sign up submit
	$(signupformID).on('submit', function(e) {
        	e.preventDefault();
		$.post( "localhost:8080/register", {
    			name: $('#name').val(),
    			email: $('#email').val(),
			token: $('#token').val(),
        		password: $('#password').val()
    		});
	});

	//Manager sign up submit
	$(msignupformID).on('submit', function(e) { 
        	e.preventDefault();
		$.post( "localhost:8080/register", {
    			name: $('#name').val(),
			email: $('#email').val(),
			company: $('#company').val(),
        		password: $('#password').val()
    		});
	});

});
