$(document).ready(function(){
	//I have to write something in the textarea
	//then I press the Submit button
	//then I need to tell the system that when I press Submit, I need to save that info in the textarea in a local storage
	$("#submit").on("click", function() {
		var message = $('#textarea').val();
		localStorage.setItem('text', message);

		var msg = $('<div draggable="true" class="box_msg"><div class="msg"></div></div>');

		$('#dragarea').append(msg);

		//Le appendeo a '.msg' el value del id 'textarea'
		$('.msg').append(message);
	});

	var load = function() {
		var storedText = localStorage.getItem('text');
		if (storedText) {
			document.getElementById('textarea').value = storedText;
		}
	};

	load();
	

	$("#delete").on("click", function(){
		localStorage.removeItem('text');
	});

});