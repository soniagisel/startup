define("movie", function() {

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

	return Movie;

});

