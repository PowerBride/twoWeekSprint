var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues');

// router.get('/', venuesCtrl.getAll);
// router.get('/:id', venuesCtrl.getSingle);
router.get('/location/:location', venuesCtrl.getLocation);
// router.post('/', venuesCtrl.create);
// router.put('/:id', venuesCtrl.updateSingle);
// router.delete('/:id', venuesCtrl.deleteSingle);

module.exports = router;