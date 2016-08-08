var connection = require('../connection');
var util = require('util');
var users = {
getAll: function(req, res) {
	connection.acquire(function(err,con){
		 con.query("Select * from users", function(err, result){
			con.release();
			res.json(result);			
			});
		});
},
getOne: function(req, res) {
req.assert('id', 'Invalid User Id').isInt();

var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
    return;
  }
	connection.acquire(function(err,con){
	con.query("Select * from users where id='"+req.params.id+"'", function(err, result){
		con.release();
		res.json(result);			
		});
	});
},

create: function(req, res) {req, res
	var newuser = req.body;
	connection.acquire(function(err,con){
	con.query('INSERT INTO users SET ?', newuser, function(err, result){
		con.release();
		if(err){
			res.json({
	  		"status":401,
	  		"message":"Fail",
	  		"result":err.stack
	  		});
		}else{
		res.json({
	  		"status":200,
	  		"message":"Success",
	  		"result":result
	  		});}			
		});
	});
},
update: function(req, res) {
	var data = req.body;
	var id = req.params.id;
	connection.acquire(function(err,con){
	con.query("UPDATE users SET ? WHERE id ='"+req.params.id+"'", data, function(err, result){
		con.release();
		if(err){
			res.json({
	  		"status":400,
	  		"message":"Fail",
	  		"result":err.stack
	  		});
		}else{
		res.json({
	  		"status":200,
	  		"message":"Success",
	  		"result":result
	  		});}			
		});
	});
},
delete: function(req, res) {
	var id = req.params.id;
	data.splice(id, 1) // Spoof a DB call
	res.json(true);
},
getroles:function(req, res){
	var id = req.params.id;
	connection.acquire(function(err,con){
	con.query("select role_id from users_roles where user_id ='"+id+"'", function(err, result){
		con.release();
		res.json(result);			
		});
	});
},
username_check:function(req, res){
	var id = req.params.id;
	connection.acquire(function(err,con){
	con.query("select count(*) as count from users where username ='"+id+"'", function(err, result){
		con.release();
		res.json({
		  		"status":200,
		  		"message":"Success",
		  		"result":result
		  		});			
		});
	});
},
email_check:function(req, res){
	var id = req.params.id;
	connection.acquire(function(err,con){
	con.query("select count(*) as count from users where email ='"+id+"'", function(err, result){
		con.release();
		res.json({
		  		"status":200,
		  		"message":"Success",
		  		"result":result
		  		});			
		});
	});
}
};
var data = [{
	name: 'user 1',
	id: '1'
	}, {
	name: 'user 2',
	id: '2'
	}, {
	name: 'user 3',
	id: '3'
}];
module.exports = users;