
/**
 * Module dependencies.
 */

var express = require("express");
var http = require("http");

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
//app.set("view cache", true);
//app.enable("view cache");
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));

app.get("/", function(req, res){
	//res.render("home",{ title: "Having fun with Express!"});
	//res.send(req.get("user-agent"));
	//res.send(req.accepted);
	//res.send(req.accepts(["html", "text", "json"]));
	//res.send(req.acceptedCharsets);
	//res.send(req.acceptsCharset("utf-8")?"yes":"no");
	//res.send(req.acceptedLanguages);
	//res.send(req.acceptsLanguage("fr")?"yes":"no");
	//res.send(req.xhr);
	res.json({message: "Hello Express"});
});

app.get("/home", function(req, res){
	res.redirect("/");
});

app.get("/name/:name?", function(req, res){
	res.send(req.param("name", "default value"));
});

app.get("/hi", function(req, res){
	var message = [
       "<h1>Hello Express</h1>",
       "<p>Welcome to 'Building Web Apps in Node.js with Express.'</p> ",
       "<p>You'll love express because it's<p>",
       "<ul><li>fast</li>",
       "<li>fun</li>",
       "<li>flexible</li></ul>"
	].join("\n");
	res.send(message);
});
/*
app.get("/users/:userId", function(req, res){
	res.send("<h1>Hello, user #"+req.params.userId);
});*/

app.post("/users", function(req, res){
	res.send("Creating a new user with the name "+req.body.username+".")
});

app.put("/users/:userId", function(req, res){
	res.send("updating a user "+req.params.userId+" with data "+req.body.username+".")
});

app.delete("/users/:userId", function(req, res){
	res.send("deleting user #"+req.params.userId);
});

app.get(/\/users\/(\d*)\/?(edit)?/, function(req, res){
	// /users/10
	// /users/10/
	// /users/10/edit
	var message = "user #"+ req.params[0] +"'s profile";
	if(req.params[1] === "edit"){
		message = "Editing "+message;
	} else {
		message = "Viewing "+message;
	}
	res.send(message);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
