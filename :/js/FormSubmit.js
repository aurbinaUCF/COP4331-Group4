
$(document).ready(function(){

	//login page submit
	$('#loginSubmit').on('click', function(event){
		event.preventDefault();

		$.ajax({
			type:"POST",
			cache:false,
			url:"http://localhost:8081/auth",
			data: {email:document.inputform.email.value, password: document.inputform.password.value},
			success: function(result){
				window.location.href = "/dashboard.html";
			},
			error:function(result){
				alert("fail " + result.responseText);
			}

		});

	});

	//Manager Sign Up page submit
	$('#mSignupSubmit').on('click', function(event){
		var title = 'manager';
		if(!$('#manageragree').is(":checked")){
			alert("Please accept the user agreements to continue.");
		} else {	
			$.ajax({
				type:"POST",
				cache:false,
				url:"http://localhost:8081/register",
				data: {title:title, name:document.msignupform.fullname.value,email:document.msignupform.email.value,password:document.msignupform.password.value,company:document.msignupform.company.value},
				success: function(result){
					alert("success");
				},
				error:function(result){
					alert("fail");
				}		
			});
			$('managersignupmodal').modal('hide');
		}
	});
	//User Sign Up page submit
	$('#userSignupSubmit').on('click', function(){
	
		var title = 'developer';
		if(!$('#useragree').is(":checked")){
			alert("Please accept the user agreements to continue.");
		} else {	
			$.ajax({
				type:"POST",
				cache:false,
				url:"http://localhost:8081/register",

				data: {title:title, token: document.usignupform.token.value, name:document.usignupform.fullname.value,email:document.usignupform.email.value,password:document.usignupform.password.value},
				success: function(result){
					alert("success");
				},
				error:function(result){
					alert("fail");
				}
			
			});
		}
	});


});
