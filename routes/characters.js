const { request } = require('express');
var express = require('express');
const charactercontroller = require('../controllers/charactersController');
const tokenCheck = require('../middleware/authToken');
var router = express.Router();

/* GET home page. */
router.get('/', tokenCheck, charactercontroller.getCharacters);
router.get('/:id', tokenCheck, charactercontroller.getCharacter);
router.post('/create', tokenCheck, charactercontroller.createCharacter);
router.put('/edit/:id', tokenCheck, charactercontroller.editCharacter);
router.delete('/delete/:id', tokenCheck, charactercontroller.deleteCharacter);

module.exports = router; 
