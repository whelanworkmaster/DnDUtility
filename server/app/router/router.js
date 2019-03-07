var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
var UserController = require('../controllers/user.controller')(User);

router.get('/user', UserController.GetUser);

router.post('/user', UserController.PostUser);

router.delete('/user/:id', UserController.DeleteUser);

router.put('user/:id', UserController.UpdateUser);

module.exports = router;