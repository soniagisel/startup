define('templates', [
	'testingHandlebars',
	'testingUnderscore',
	'testingDust',
	'jqueryui'
	], function(handlebarsTemplate, underscoreTemplate, dustTemplate) {
	
	$("#handlerbars").html(handlebarsTemplate);

	$("#underscore").html(underscoreTemplate);

	$("#dust").html(dustTemplate);

	$('#tabs').tabs();

});