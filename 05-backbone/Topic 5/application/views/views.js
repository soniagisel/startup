app.movieView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this; 
    },
    initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this); 
    },      
    events: {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',
        'click .toggle': 'togglewatched',
        'click .destroy': 'destroy'
    },
    edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
    },
    close: function(){
        var value = this.input.val().trim();
        if(value) {
            this.model.save({name: value});
        }
        this.$el.removeClass('editing');
    },
    updateOnEnter: function(e){
        if(e.which == 13){
            this.close();
        }
    },
    togglewatched: function(){
        this.model.toggle();
    },
    destroy: function(){
        this.model.destroy();
    }      
});


app.AppView = Backbone.View.extend({
    el: '#movieApp',
    initialize: function () {
        this.input = this.$('#new-movie');
        app.movieList.on('add', this.addAll, this);
        app.movieList.on('reset', this.addAll, this);
        app.movieList.fetch(); 
    },
    events: {
        'keypress #new-movie': 'createmovieOnEnter'
    },
    createmovieOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { 
            return;
        }
        app.movieList.create(this.newAttributes());
        this.input.val(''); 
    },
    addOne: function(movie){
        var view = new app.movieView({model: movie});
        $('#movie-list').append(view.render().el);
    },
    addAll: function(){
        this.$('#movie-list').html(''); 

        switch(window.filter){
            case 'non-watched':
                _.each(app.movieList.remaining(), this.addOne);
            break;
            case 'watched':
                _.each(app.movieList.watched(), this.addOne);
            break;            
            default:
                app.movieList.each(this.addOne, this);
            break;
        }
    },
    newAttributes: function(){
        return {
          name: this.input.val().trim(),
          watched: false
        }
    }
});