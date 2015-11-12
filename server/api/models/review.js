var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    locationRating: {type: Number, "default": 0, min: 0, max: 5},
    serviceRating: {type: Number, "default": 0, min: 0, max: 5},
    supportRating: {type: Number, "default": 0, min: 0, max: 5},
    cleanlinessRating: {type: Number, "default": 0, min: 0, max: 5},
    valueRating: {type: Number, "default": 0, min: 0, max: 5},
    communicationRating: {type: Number, "default": 0, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;