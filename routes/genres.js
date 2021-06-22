const { request } = require('express');
var express = require('express');
const genrescontroller = require('../controllers/genresController');
var router = express.Router();

/* GET home page. */
router.get('/', genrescontroller.getGenres);
router.post('/create', genrescontroller.createtGenre);
router.put('/edit/:id', genrescontroller.editGenre);
router.delete('/delete/:id', genrescontroller.deleteGenre);

module.exports = router;
