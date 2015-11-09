var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.createUser = function(req, res, next){
  User.createSecure(req.body.username, req.body.email, req.body.password, function(err, user){
    if(err){
      sendJsonResponse(res, 404, {'status': 'something went wrong'});
    }

    sendJsonResponse(res, 200, user);

  });
};

module.exports.login = function(req, res, next){
  User.authenticate(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
};

module.exports.showProfile = function(req, res, next){
  //figure out whether user is logged in
  if(!req.session.userId){
    sendJson(res, 200, req.session.likes);
  } else {
    User.findOne({_id: req.session.userId})
    .populate('likes')
    .exec(function(err, user){
      if(err){
        sendJsonResponse(res, 404, {'status': 'user could not be found'});
      }

      var yser = {
        username: user.username,
        email: user.email,
        picture: user.picture,
        likes: user.likes
      };
      sendJson(res, 200, yser);
    });
  }
};

module.exports.logout = function(req, res, next){
  req.session.userId = null;
  req.user = null;

  sendJson(res, 200, {'status': 'logged out'});
};