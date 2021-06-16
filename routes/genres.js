const { request } = require('express');
var express = require('express');
const genrescontroller = require('../controllers/genresController');
var router = express.Router();

/* GET home page. */
router.post('/create', genrescontroller.createtGenre);

module.exports = router;
