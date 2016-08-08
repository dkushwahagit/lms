var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth.js');
var user = require('../controllers/users.js');
var role = require('../controllers/roles.js');
var usersrole = require('../controllers/usersrole.js');

/*
* Routes that can be accessed by any one
*/
router.post('/api/uauth/login', auth.login);
router.get('/api/uauth/test', auth.test);
router.get('/api/uauth/username/:id', auth.getUsername);
/*

* Routes that can be accessed only by autheticated users

router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
router.get('/api/v1/admin/username_check/:id', user.username_check);
router.get('/api/v1/admin/email_check/:id', user.email_check);

/*
*	ROLES ROUTING
*/
router.get('/api/v1/roles/roles', role.getAll);
router.get('/api/v1/roles/pagebyrole/:id', role.getPageByRole);

/*
*	USER ROLES TRANSACTION ROUTING
*/
router.get('/api/v1/admin/usersrole/:id', usersrole.getOne);
router.post('/api/v1/admin/usersrole/add', usersrole.create);
router.delete('/api/v1/admin/usersrole/:id', usersrole.delete);

module.exports = router;