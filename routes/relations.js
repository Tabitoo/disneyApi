const { request } = require('express');
var express = require('express');
const relationsController = require('../controllers/relationsController');
var router = express.Router();

/* GET home page. */
router.get('/', relationsController.getRelations)
router.post('/create', relationsController.createtRelation);
router.put('/edit/:id', relationsController.editRelation);
router.delete('/delete/:id', relationsController.deleteRelation);

module.exports = router;
