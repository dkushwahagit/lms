var connection = require('../connection');
var util = require('util');
var roles = {
    getAll: function (req, res) {
        connection.acquire(function (err, con) {
            con.query("select * from roles", function (err, result) {
                con.release();
                res.json(result);
            });
        });
    },
    getOne: function (req, res) {
        var id = req.params.id;
        var product = data[0]; // Spoof a DB call
        res.json(product);
    },
    create: function (req, res) {
        var newProduct = req.body;
        data.push(newProduct); // Spoof a DB call
        res.json(newProduct);
    },
    update: function (req, res) {
        var updateProduct = req.body;
        var id = req.params.id;
        data[id] = updateProduct // Spoof a DB call
        res.json(updateProduct);
    },
    delete: function (req, res) {
        var id = req.params.id;
        data.splice(id, 1) // Spoof a DB call
        res.json(true);
    },
    usersrole: function (req, res) {
        connection.acquire(function (err, con) {
            con.query("select role_id from users_roles where user_id ='" + req.params.id + "'", function (err, result) {
                con.release();
                res.json(result);
            });
        });
    },
    getUsersRoles: function (req, res) {
        connection.acquire(function (err, con) {
            con.query("SELECT roles.id, roles.name, roles.description FROM users_roles INNER JOIN  roles ON roles.id = users_roles.role_id WHERE users_roles.user_id ='" + req.params.id + "'", function (err, result) {
                con.release();
                res.json(result);
            });
        });
    },
    getPageByRole: function (req, res) {
        connection.acquire(function (err, con) {
            con.query("SELECT DISTINCT page_name,pages.* FROM pages JOIN roles_pages ON roles_pages.page_id = pages.id WHERE roles_pages.role_id IN('" + req.params.id + "') ORDER BY pages.page_order ASC", function (err, result) {
                con.release();
                res.json(result);
            });
        });
    }
};
var data = [
    {
        name: 'product 1',
        id: '1'
    }, {
        name: 'product 2',
        id: '2'
    }, {
        name: 'product 3',
        id: '3'
    }
];

module.exports = roles;