$(document).ready(function() {
	var $section = $(".section");
	getTweets("html5");

	//When the document is ready, the fade-in runs in the ".section"
	//It also puts the ".alias" in focus when the fade-in finishes.

	$section.fadeIn("slow", function() {
		$(".alias").focus();

		//It runs a function when I press "submit"
		//With .prevenDefault I stop the default action

		$(".form").on("submit",function(event){
			event.preventDefault();
			var $form = $(this),
				$alias = $(".alias");

			//With this I avoid the submit runs without even a character in the input.
			//If the lenght of characters of "$alias" is equal to zero, it'll show the alert

			if (!$alias.val().length) {
				alert("Name cannot be empty");
				// This is the end of the function
				return;
			}

			//I create an html element that will own the class "highlight"

			var $response = $("<p />");
			//With ajax I make an asynchronous request to the server

			$.ajax({
			    url: $form.attr("action") + $alias.val(),
			    data: $form.serialize(),
			    success: function(data)
			    {	
			    	//If the server givesback a 200, It'll add the class "succes" to the element
			    	
			    	$response.addClass("success");
			    	//I create a variable to save the information that's saved in "$alias" (string)
			    	var str = data.response;
			    	//Another variable to save the place where that info is saved (substring)
			    	var substr = $alias.val();
			    	//Now I create a third variable, where through ".replace" I'll replace the info saved in "$alias"
			    	//inside the substring, with a <span> with the class "hightlight" where the info will appear.
			    	var new_string = str.replace(substr, '<span class="highlight">' + substr + '</span>');
			    	//Now, I will add through ".html" the third variable to that <p> saved in "$response"
			    	//so it'll show the input content with all the styles of the class "hightlight"

			    	$response.html(new_string);
			    	//I place the whole $response in the "$section"
			    	$section.html($response);

			    },
				error: function (request, statusr, error) {
					//If the server gives back a 404, it'll add the class "error" to the element
        			$response.addClass("error");
        			//I set a text to the <p> created in $response
			    	$response.text("There was an error");
			    	//It adds the text to the htmll
			    	$section.html($response);

    			}
			});
		});


	});
});


function getTweets(searching) {

	$.ajax({
	    url: "http://tweetproxy.ap01.aws.af.cm/search",
	 
	 	//It says to jQery that I'm waiting for JSONP
	    dataType: "jsonp",
	 
	    //It tells YQL what I want and that we want JSON
	    data: {
	        q: searching
	    },
	 	
	 	//It works with the response
	    success: function( response ) {
	        var statuses = response.statuses;

	        //I used a function $.each that iterates the values of the objects
	        //and I made a variable for each parameter that I need to obtain, to show it then 
	        $.each( statuses, function( key, value ) {
	        	var $tweet = $("<article />");
	        	$tweet.addClass("tweet");

			  	var statusObj = value;
			  	var $profileImg = $("<img class='img' src='" + statusObj.user.profile_image_url + "'/>");
			  	var $userName = $("<a href=''><h1 class='h1'>" + statusObj.user.screen_name + "</h1></a>");
			  	var $text = $("<p class='text'>" + statusObj.text + "</p>");
			  	var $createdAt = $("<h3 class='h3'>" + statusObj.created_at + "</h3>");

			  	var $info = $tweet.append($profileImg, $userName, $text, $createdAt);
			  	$("#tweets").append($info);  	
			});
	    }
	});
}


