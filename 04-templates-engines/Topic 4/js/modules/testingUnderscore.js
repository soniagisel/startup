	define('testingUnderscore', [
	'jquery',
	'underscore',
	'../data/json_underscore_structure'
	], function($, _ , data) {
	
	var source   = $("#underscore-template").html();
	var template = _.template(source,data);
	
	return template;	

});