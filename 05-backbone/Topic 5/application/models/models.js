var app = {}; 
    
app.movie = Backbone.Model.extend({
    defaults: {
		name: '',
		watched: false
    },
    toggle: function(){
		this.save({ watched: !this.get('watched')});
    }
});
