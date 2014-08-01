require.config({
    baseUrl: "js",
    paths: {
        movie: "classes/movie",
        director: "classes/director",
        jquery: "libs/jquery-2.1.1"
    },
    shim: {
        jquery: {
            exports: "jquery"
        },
        director: {
            deps: ["jquery"],
            exports:"director"
        },
        movie: {
            deps: ["director"],
            exports:'movie'
        }
    }
});


require(["jquery", "movie", "director"], function($, movie, director) {
	var alien = new movie();
	var rScott = new director();
    rScott.setQuote("'Cast is everything'");
    rScott.setQuote("'Do what you want!'");
    rScott.setName("Ridley Scott");
	alien.set("Director", rScott);	
	alien.get("Director").speak();
	alien.get("Director").speakJquery();
});