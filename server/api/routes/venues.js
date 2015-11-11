var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues');

// router.get('/', venuesCtrl.getAll);

router.get('/likes', venuesCtrl.getLikes);
router.get('/venues', venuesCtrl.getAll);
router.get('/:name', venuesCtrl.getSingle);

router.get('/location/:location', venuesCtrl.getLocation);

router.post('/likes', venuesCtrl.setLike);
router.post('/like', venuesCtrl.setSingleVenueLike);
router.post('/', venuesCtrl.create);

// router.put('/:id', venuesCtrl.updateSingle);
// router.delete('/:id', venuesCtrl.deleteSingle);

module.exports = router;