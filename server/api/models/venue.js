var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: {type: String, required: true},
    src: {type: String, required: true},
    images: [String],
    mainImg: {type: String, required: true},
    bookedDates: [Date],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    description: String,
    styles: [String],
    services: [String],
    capacity: Number,
    timeRestrictions: String,
    rentalFees: String,
    rentalFeeMin: Number,
    rentalFeeMax: Number,
    amenities: [String],
    specialRestrictions: String,
    alcohol: String,
    address: String,
    coords: {type: [Number], index: '2dsphere'}
});


var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;