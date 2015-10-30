var express = require('express');
var router = express.Router();
var bpModelCtrl = require('../controllers/blueprintModel');

router.get('/', bpModelCtrl.getAll);
router.get('/:id', bpModelCtrl.getSingle);
router.post('/', bpModelCtrl.create);
router.put('/:id', bpModelCtrl.updateSingle);
router.delete('/:id', bpModelCtrl.deleteSingle);

module.exports = router;