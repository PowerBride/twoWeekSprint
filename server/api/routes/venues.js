var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues');

// router.get('/', venuesCtrl.getAll);

router.get('/:name', venuesCtrl.getSingle);

router.get('/location/:location', venuesCtrl.getLocation);

router.get('/venues', venuesCtrl.getAll);

router.post('/likes', venuesCtrl.setLike);
router.post('/', venuesCtrl.create);

// router.put('/:id', venuesCtrl.updateSingle);
// router.delete('/:id', venuesCtrl.deleteSingle);

module.exports = router;