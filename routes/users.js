const { request } = require('express');
var express = require('express');
const usercontroller = require('../controllers/usersController');
var router = express.Router();



router.post('/register', usercontroller.Register);
router.post('/login',usercontroller.login);

module.exports = router;
