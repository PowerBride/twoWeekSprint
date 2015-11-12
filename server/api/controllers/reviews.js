var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

var mongoose = require('mongoose');
var User = require('../models/user');
var Review = require('../models/review');
var Venue = require('../models/venue');

module.exports.getAll = function(req, res, next){
  Review.find().exec(function(err, reviews){
    if(err){
      sendJsonResponse(res, 404, {'status': 'something went wrong'});
    }

    console.log('find complete');
    sendJsonResponse(res, 200, reviews);
  });
};

module.exports.create = function(req, res, next){
  var review = new Review ({
    author: req.body.author,
    rating: req.body.rating,
    locationRating: req.body.locationRating,
    serviceRating: req.body.serviceRating,
    supportRating: req.body.supportRating,
    cleanlinessRating: req.body.cleanlinessRating,
    valueRating: req.body.valueRating,
    communicationRating: req.body.communicationRating,
    reviewText: req.body.reviewText,
  });

  review.save();

  Venue.findOne({src: req.body.src})
  .exec(function(err, venue){
      if(err){
        sendJsonResponse(res, 404, {'status': 'venue could not be found'});
      }

    venue.reviews.push(review);
    venue.save();
    sendJsonResponse(res, 200, venue);
  });
};