var postLocation = "test.php";
var formID = "#inputform";

$(document).ready(function(){
	
	$(formID).on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();
        var data = $(formID+" :input").serializeArray();
		console.log(data);
		$.post( postLocation, data);
    });

});