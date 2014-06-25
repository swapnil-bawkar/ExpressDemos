
/*
 * GET users listing.
 */

exports.list = function(req, res){
	Users.find({}, function(err, docs){
		console.log(docs);
		res.render("users/index",{users: docs});
	}); 
};

exports.newuser = function(req, res){
	res.render("users/new");
};

exports.createUser = function(req, res){
	var b = req.body;
	new Users({
		name: b.name,
		email: b.email,
		age: b.age
	}).save(function(err, user){
		if(err){
			res.json(err);
		}
		res.redirect("/users/"+ user.name);
	});
};

exports.showUser = function(req, res){
	res.render("users/show", {user: req.user});
};

exports.editUser = function(req, res){
	res.render("users/edit", {user: req.user});
};

exports.updateUser = function(req, res){
	var b = req.body;
	Users.update(
		{name: req.params.name},
		{name: b.name, age: b.age, email: b.email},
		function(err){
			res.redirect("/users/"+ b.name);
		}
	);
};

exports.deleteUser = function(req, res){
	Users.remove({name: req.params.name}, function(err){
		res.redirect("/users");
	});
};