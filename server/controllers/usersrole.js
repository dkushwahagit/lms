var connection = require('../connection');
var util = require('util');
var usersrole = {
	getAll: function(req, res) {
		connection.acquire(function(err,con){
		con.query("select * from roles", function(err, result){
			con.release();
			res.json(result);			
			});
		});
	},
	getOne: function(req, res) {
		connection.acquire(function(err,con){
		con.query("SELECT roles.id, roles.name, roles.description FROM users_roles INNER JOIN  roles ON roles.id = users_roles.role_id WHERE users_roles.user_id ='"+req.params.id+"'", function(err, result){
			con.release();
			res.json(result);			
			});
		});
	},
	create: function(req, res) {
		var data = req.body;
		connection.acquire(function(err,con){
		con.query('INSERT INTO users_roles SET ?', data, function(err, result){
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
	update: function(req, res) {
		var updateProduct = req.body;
		var id = req.params.id;
		data[id] = updateProduct // Spoof a DB call
		res.json(updateProduct);
	},
	delete: function(req, res) {
		connection.acquire(function(err,con){
		con.query("delete from  users_roles WHERE user_id ='"+req.params.id+"'", function(err, result){
			con.release();
			res.json({
		  		"status":200,
		  		"message":"Success",
		  		"result":result
		  		});			
			});
		});
	},
	getPageByRole:function(req, res){
		connection.acquire(function(err,con){
		con.query("SELECT DISTINCT page_name,pages.* FROM pages JOIN roles_pages ON roles_pages.page_id = pages.id WHERE roles_pages.role_id IN('"+req.params.id+"') ORDER BY pages.page_order ASC",function(err, result){
			con.release();
			res.json(result);			
			});
		});
	}
};
var data = [{
name: 'product 1',
id: '1'
}, {
name: 'product 2',
id: '2'
}, {
name: 'product 3',
id: '3'
}];

module.exports = usersrole;