var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');

// router.get('/', venuesCtrl.getAll);
// router.get('/:name', venuesCtrl.getSingle);

// router.get('/location/:location', venuesCtrl.getLocation);
// router.post('/', venuesCtrl.create);
// router.put('/:id', venuesCtrl.updateSingle);
// router.delete('/:id', venuesCtrl.deleteSingle);

router.post('/users', userCtrl.createUser);
router.post('/sessions', userCtrl.login);
router.get('/user', userCtrl.showProfile);
router.get('/users', userCtrl.getAll);
router.get('/logout', userCtrl.logout);

module.exports = router;