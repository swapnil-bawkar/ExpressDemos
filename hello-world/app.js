var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/json', function(req, res){
  res.send({msg:'Hello World'});
});

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});
