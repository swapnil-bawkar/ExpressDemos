
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require("mongoose");
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect("mongodb://localhost/bookmark");

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	age: Number
});
Users = mongoose.model("Users", UserSchema);

app.get("/", routes.index);
//User Index
app.get("/users", user.list);
//New
app.get("/users/new", user.newuser);
//Create
app.post("/users", user.createUser);

app.param("name", function(req, res, next, name){
	Users.find({name: name}, function(err, docs){
		req.user = docs[0];
		next();
	});
});
//Show
app.get("/users/:name", user.showUser);

//Edit
app.get("/users/:name/edit", user.editUser);

//Update
app.put("/users/:name", user.updateUser);

//Delete
app.delete("/users/:name", user.deleteUser);

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
