const { request } = require('express');
var express = require('express');
const relationsController = require('../controllers/relationsController');
var router = express.Router();

/* GET home page. */
router.post('/create', relationsController.createtRelation);

module.exports = router;