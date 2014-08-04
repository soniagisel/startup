define('testingDust', [
	'jquery',
	'dust',
	'../data/json_dust_structure'
	], function($, dust , data) {
	
	var dataCompiled = "";

	var source = $("#dust-template").html();

	var compiled = dust.compile(source, "template");
	dust.loadSource(compiled);
	dust.render("template", data, function(err, out) {
		dataCompile = out;
	});
	
	return dataCompile;	

});