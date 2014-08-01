define("director", [], function() {

	var Director = function(name) {
		this.name = name;
		this.quotes = []; 
	};

	Director.prototype = {

		setName : function (name) {
            this.name = name;
        },

        getName : function (name) {
            return this.name;
        },

		setQuote: function(quote) {
			this.quotes.push(quote);
		},

		getQuote: function(quote) {
			return this.quotes(quote);
		},

		speak: function(quotes) {
			for (var i = 0; i<this.quotes.length; i++) {
				console.log(this.name + " said " + this.quotes[i]);
			};
		},

		speakJquery: function() {
			var todo = this.name + " said ";

			$.each(this.quotes, function(posicion,elemento) {				
				todo +=  elemento + ", ";								
				

			});
			console.log(todo);
		}

	};

	return Director;

});



