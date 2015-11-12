var express = require('express');
var router = express.Router();
var reviewsCtrl = require('../controllers/reviews');

router.post('/', reviewsCtrl.create);
router.get('/', reviewsCtrl.getAll);

module.exports = router;