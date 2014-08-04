define('testingHandlebars', [
	'jquery',
	'handlebars',
	'../data/json_handlebars_structure'
	], function($, Handlebars, data) {
	

	var source   = $("#handlebars-template").html();
	var template = Handlebars.compile(source);
	
	return template(data);	

});