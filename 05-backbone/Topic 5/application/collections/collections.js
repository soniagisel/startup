app.movieList = Backbone.Collection.extend({
    model: app.movie,
    localStorage: new Store("backbone-movie"),
    watched: function() {
        return this.filter(function( movie ) {
            return movie.get('watched');
        });
    },
    remaining: function() {
        return this.without.apply( this, this.watched() );
    }      
});

app.movieList = new app.movieList();