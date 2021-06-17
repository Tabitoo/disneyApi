const { request } = require('express');
var express = require('express');
const charactercontroller = require('../controllers/charactersController');
var router = express.Router();

/* GET home page. */
router.get('/', charactercontroller.getCharacters);
router.get('/:id', charactercontroller.getCharacter);
router.post('/create', charactercontroller.createCharacter);

module.exports = router;
