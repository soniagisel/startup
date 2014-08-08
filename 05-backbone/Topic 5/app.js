var express = require('express');
var app = express();


app.use('/static', express.static(__dirname + '/public'));


app.use('/app', express.static(__dirname + '/application'));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});