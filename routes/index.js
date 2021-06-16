const { request } = require('express');
var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.Index);

module.exports = router;
