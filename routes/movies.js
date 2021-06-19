const { request } = require('express');
var express = require('express');
const moviescontroller = require('../controllers/moviesController');
const tokenCheck = require('../middleware/authToken');
var router = express.Router();

/* GET home page. */
router.get('/', moviescontroller.getMovies);
router.get('/:id', tokenCheck,moviescontroller.getMovie);
router.post('/create', tokenCheck,moviescontroller.CreateMovie);

module.exports = router;
