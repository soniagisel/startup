app.Router = Backbone.Router.extend({
	routes: {
		'*filter' : 'setFilter'
	},
	setFilter: function(params) {
		window.filter = params.trim() || '';
		app.movieList.trigger('reset');
	}
});     

app.router = new app.Router();
Backbone.history.start();    
app.appView = new app.AppView(); 
