var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.index);
router.get('/login', indexCtrl.login);
router.get('/logout', indexCtrl.logout);
router.get('/signup', indexCtrl.signup);
router.get('/user', indexCtrl.user);

module.exports = router;
