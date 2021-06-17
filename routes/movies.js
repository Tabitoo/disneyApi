const { request } = require('express');
var express = require('express');
const moviescontroller = require('../controllers/moviesController');
var router = express.Router();

/* GET home page. */
router.get('/', moviescontroller.getMovies);
router.get('/:id', moviescontroller.getMovie);
router.post('/create', moviescontroller.CreateMovie);

module.exports = router;
