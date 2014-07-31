/* MOVIE CLASS */

var Movie = function(name, actor, gender) {

	var attributes = {
		name : name,
		actor : actor,
		gender : gender
	}

	this.set = function(attr, value) {
		attributes[attr] = value;
	};

	this.get = function(attr) {
		return attributes[attr];
	};

	this.getAllAttributes = function() {
        return attributes;
    };
};

Movie.prototype = {

	play : function() {
		//I create the event
		var eventPlaying = new CustomEvent("playing", { 
				"detail": this.getAllAttributes() 
			});
		//I dispatch the event for it to be listened to
		document.dispatchEvent(eventPlaying);
	},

	stop : function() {
		var eventStopped = new CustomEvent("stopped", { 
				"detail": this.getAllAttributes()
			});
		document.dispatchEvent(eventStopped);
	},

	DownloadableMovie : function(name) {
		alert("Downloading " + this.get("name"));
	}

}

/* MOVIE OBSERVER CLASS */

var MovieObserver = function() {}

MovieObserver.prototype = {

	playing : function(movieAttributes) {
		alert("The movie " + movieAttributes.name + " is playing on display");
	},

	stopped : function(movieAttributes) {
		alert("The movie " + movieAttributes.name + " has stopped");
	}

}

var observer = new MovieObserver();

/* LISTENERS */

document.addEventListener("playing", function(e) {
	observer.playing(e.detail);
});


document.addEventListener("stopped", function(e) {
	observer.stopped(e.detail);
});

//Creating Movie instances

var Grease = new Movie("Grease","John Travolta","Musical Comedy"); 

var TheRing = new Movie();
TheRing.set("name", "The Ring");
TheRing.set("actor", "Naomi Watts");
TheRing.set("gender", "Horror");

var Beetlejuice = new Movie();
Beetlejuice.set("name", "Beetlejuice");
Beetlejuice.set("actor", "Winona Ryder");
Beetlejuice.set("gender", "Comedy");


Beetlejuice.DownloadableMovie();
Grease.play();
TheRing.stop();


/* MODULE PATTERN */
//http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var Module = (function() {
	var Movie = {},
		attributes = {
			name : "",
			actor : "",
			gender : ""
		};

	Movie.play = function() {
		//I create the event
		var eventPlaying = new CustomEvent("playing", { 
				"detail": this.getAllAttributes() 
			});
		//I dispatch the event for it to be listened to
		document.dispatchEvent(eventPlaying);
	};

	Movie.stop = function() {
		
		var eventStopped = new CustomEvent("stopped", { 
				"detail": this.getAllAttributes() 
			});
		document.dispatchEvent(eventStopped);
	};

	Movie.get = function(attr) {
		return attributes[attr];
	};

	Movie.set = function(attr, value) {
		 attributes[attr] = value;
	};

	Movie.getAllAttributes = function(attr) {
		return attributes;
	};

	Movie.DownloadableMovie = function() {
		return Movie;
	};

	return Movie;

})();

Module.set("name", "Pupl Fiction");
Module.set("actor", "Uma Thurman");
Module.set("gender", "Dramma");


var DownloadableMovie = (function(Module) {

	Module.download = function() {
		alert("Downloading Movie");
	};

	return Module;

})(Module || {});

Module.play();
Module.stop();
Module.download();

/* MIXIN */


var Social = function() {

	this.share = function(friendName) {
		alert(friendName + " has shared a movie");
	};

	this.like = function() {
		alert("Like");
	};

	return this;

}

Social.call(Movie.prototype);

var ToyStory = new Movie("Toy Story", "Andy", "Animated");

ToyStory.share("Sonia");
ToyStory.like();


/* ACTOR CLASS */

var Actor = function(name, lastname) {
	this.name = name;
	this.lastname = lastname;
};

Actor.prototype = {

	act : function() {
		alert(this.name + " is acting");
	}
}

var nicole = new Actor("Nicole", "Kidman");
var kirsten = new Actor("Kirsten", "Dunst");

nicole.act();

/* EXTENDED ACTOR CLASS WITH AN ACTORS ARRAY */

Movie.prototype.actors = [];
Movie.prototype.setActor = function(Actor) {
	this.actors.push(Actor);
} 
Movie.prototype.getActors = function() {
	return this.actors;
}

var Spiderman = new Movie("Spiderman", "Kirsten Dunst", "Action");

Spiderman.setActor(nicole);
console.log(Spiderman.getActors());