
$(document).ready(function(){

	//login page submit
	$('#loginSubmit').on('click', function(){
		
		$.ajax({
			type:"POST",
			cache:false,
			crossDomain: true,
			url:"http://localhost:8080/auth",
			data: {email:document.inputform.email.value, password: document.inputform.password.value},
			success: function(result){
				alert("success");
			},
			error:function(result){
				alert("fail");
			}

		})
	});

	//login page submit
	$('#mSignupSubmit').on('click', function(){
		var title = 'manager';
		$.ajax({
			type:"POST",
			cache:false,
			url:"http://localhost:8080/register",
			data: {title:title, name:document.msignupform.fullname.value,email:document.msignupform.email.value,password:document.msignupform.password.value},
			success: function(result){
				alert("success");
			},
			error:function(result){
				alert("fail");
			}		
		})
	});
	//login page submit
	$('#userSignupSubmit').on('click', function(){
	
		var title = 'developer';
		$.ajax({
			type:"POST",
			cache:false,
			url:"http://localhost:8080/register",
			data: {title:title, token: document.usignupform.token.value, name:document.usignupform.fullname.value,email:document.usignupform.email.value,password:document.usignupform.password.value},
			success: function(result){
				alert("success");
			},
			error:function(result){
				alert("fail");
			}
			
		})
	});


});
