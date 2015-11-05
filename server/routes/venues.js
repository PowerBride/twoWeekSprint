var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venuesCtrl');

router.get('/:name', venuesCtrl.single);

module.exports = router;
