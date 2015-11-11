var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

function find(arr, name){
  var i = 0;

  for(i; i<arr.length; i++){
    var arre = arr[i].name.split(' ');
    var string = arre.join('');
    var lower = string.toLowerCase();

    if(lower === name){
      console.log('CHECK');
      return arr[i];
    }
  }

  return -1;
}

var User = require('../models/user');
var Venue = require('../models/venue');

module.exports.getAll = function(req, res){
  Venue.find().exec(function(err, venues){
    if(err){
      sendJsonResponse(res, 404, {'status': 'something went wrong'});
    }

    console.log('find complete');
    sendJsonResponse(res, 200, venues);
  });
};

module.exports.create = function(req, res){
  var newVenue = {
    name: req.body.name,
    src: req.body.src,
    images: req.body.images,
    mainImg: req.body.mainImg,
    bookedDates: [],
    reviews: [],
    description: req.body.description,
    styles: req.body.styles,
    services: req.body.services,
    capacity: req.body.capacity,
    timeRestrictions: req.body.timeRestrictions,
    rentalFees: req.body.rentalFees,
    rentalFeeMin: req.body.rentalFeeMin,
    rentalFeeMax: req.body.rentalFeeMax,
    amenities: req.body.amenities,
    specialRestrictions: req.body.specialRestrictions,
    alcohol: req.body.alcohol,
    address: req.body.address,
    coords: req.body.coords
  };

  Venue.create(newVenue, function(err, venue){
    if(err){
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, venue);
    }
  });
};


module.exports.getLocation = function(req, res){


    Venue.find().exec(function(err, entries){
      if(err){
        sendJsonResponse(res, 404, {'status': 'something went wrong'});
      }

      if(!req.session.userId){
        var arr = [];
        console.log("ENTRIES", entries);

        for(var i = 0; i < entries.length; i++){
          var venue = {
            name: entries[i].name,
            src: entries[i].src,
            images: entries[i].images,
            mainImg: entries[i].mainImg,
            bookedDates: [],
            reviews: [],
            _id: entries[i]._id,
            description: entries[i].description,
            styles: entries[i].styles,
            services: entries[i].services,
            capacity: entries[i].capacity,
            timeRestrictions: entries[i].timeRestrictions,
            rentalFees: entries[i].rentalFees,
            rentalFeeMin: entries[i].rentalFeeMin,
            rentalFeeMax: entries[i].rentalFeeMax,
            amenities: entries[i].amenities,
            specialRestrictions: entries[i].specialRestrictions,
            alcohol: entries[i].alcohol,
            address: entries[i].address,
            coords: entries[i].coords,
            liked: false
          };
          arr.push(venue);
        }
        console.log("ARR", arr);
        sendJsonResponse(res, 200, arr);
      } else {
        User.findOne({_id: req.session.userId})
        .populate('likes')
        .exec(function(err, user){
          console.log(user, 'user');
          var arr = [];
          for(var i = 0; i < entries.length; i++){
            var venue = {
              name: entries[i].name,
              src: entries[i].src,
              images: entries[i].images,
              mainImg: entries[i].mainImg,
              bookedDates: [],
              reviews: [],
              _id: entries[i]._id,
              description: entries[i].description,
              styles: entries[i].styles,
              services: entries[i].services,
              capacity: entries[i].capacity,
              timeRestrictions: entries[i].timeRestrictions,
              rentalFees: entries[i].rentalFees,
              rentalFeeMin: entries[i].rentalFeeMin,
              rentalFeeMax: entries[i].rentalFeeMax,
              amenities: entries[i].amenities,
              specialRestrictions: entries[i].specialRestrictions,
              alcohol: entries[i].alcohol,
              address: entries[i].address,
              coords: entries[i].coords,
            };

            for(var j = 0; j < user.likes.length; j++){

              if(user.likes[j]._id.equals(venue._id)){
                
                venue['liked'] = true;
                break;
                
              } else {
                venue['liked'] = false;
              }
            }

            arr.push(venue);
            
          }
          console.log(arr);
          console.log('find complete');
          sendJsonResponse(res, 200, arr);
        });

        
    }
  });
};


module.exports.getSingle = function(req, res){
  var ven = {
    name: '',
    _id: '',
    images: [],
    liked: false,
    bookedDates: [],
    reviews: [],
    description: '',
    styles: [],
    services: [],
    capacity: 0,
    timeRestrictions: '',
    rentalFees: '',
    rentalFeeMin: 0,
    rentalFeeMax: 0,
    amenities: [],
    specialRestrictions: '',
    alcohol: '',
    address: '',
    coords: []
  };


  Venue.findOne({src: req.params.name})
  .exec(function(err, venue){
    if(err){
      sendJsonResponse(res, 404, {'error': 'could not find object'});
      
    } else {
        ven.name = venue.name;
        ven._id = venue._id;
        ven.images = venue.images;
        ven.bookedDates = venue.bookedDates;
        ven.reviews = venue.reviews;
        ven.description = venue.description;
        ven.styles = venue.styles;
        ven.services = venue.services;
        ven.capacity = venue.capacity;
        ven.timeRestrictions = venue.timeRestrictions;
        ven.rentalFees = venue.rentalFees;
        ven.rentalFeeMax = venue.rentalFeeMax;
        ven.rentalFeeMin = venue.rentalFeeMin;
        ven.amenities = venue.amenities;
        ven.specialRestrictions = venue.specialRestrictions;
        ven.alcohol = venue.alcohol;
        ven.address = venue.address;
        ven.coords = venue.coords;
      if(!req.session.userId){
        console.log('no user logged in');
        sendJsonResponse(res, 200, ven);
      } else {
        User.findOne({_id: req.session.userId})
        .exec(function(err, user){
          if(err){
            sendJsonResponse(res, 404, {'status': 'user could not be found'});
          }
          for(var i = 0; i < user.likes.length; i++){
              console.log('user likes', user.likes[i]);
              console.log('venid   id', ven._id);
              if(user.likes[i].equals(ven._id)){
                console.log('set liked!');
                console.log(ven.liked);
                ven.liked = true;
                console.log(ven.liked);
                
              }
            }

          console.log(ven);
          sendJsonResponse(res, 200, ven);
        });

      }
      
      
    }
  });
  
};

module.exports.getLikes = function(req, res){

  if(!req.session.userId){
    sendJsonResponse(res, 400, {'error': 'user not logged in'});
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

      var arr = [];
      for(var i = 0; i < yser.likes.length; i++){
        var venue = {
              name: yser.likes[i].name,
              src: yser.likes[i].src,
              images: yser.likes[i].images,
              mainImg: yser.likes[i].mainImg,
              bookedDates: [],
              reviews: [],
              _id: yser.likes[i]._id,
              description: yser.likes[i].description,
              styles: yser.likes[i].styles,
              services: yser.likes[i].services,
              capacity: yser.likes[i].capacity,
              timeRestrictions: yser.likes[i].timeRestrictions,
              rentalFees: yser.likes[i].rentalFees,
              rentalFeeMin: yser.likes[i].rentalFeeMin,
              rentalFeeMax: yser.likes[i].rentalFeeMax,
              amenities: yser.likes[i].amenities,
              specialRestrictions: yser.likes[i].specialRestrictions,
              alcohol: yser.likes[i].alcohol,
              address: yser.likes[i].address,
              coords: yser.likes[i].coords,
              liked: true
            };
        arr.push(venue);
      }
      yser.likes = arr;

      sendJsonResponse(res, 200, yser);
    });
  }
};

module.exports.setLike = function(req, res){
  if(!req.session.userId){
    sendJsonResponse(res, 404, {'error': 'user not logged in'});
  } else {
    
    User.findOne({_id: req.session.userId})
    .exec(function(err, user){
      if(err){
        sendJsonResponse(res, 404, {'status': 'user could not be found'});
      }
      console.log(user, 'aha');
      var arr = user.likes;
      var pos = arr.indexOf(req.body._id);
      console.log('pos', pos);
      if(pos === -1){
        Venue.findOne({_id: req.body._id})
        .exec(function(err, venue){
          if(err){
            sendJsonResponse(res, 400, {'status': 'venue with provided ID could not be found'});
          }
          console.log('venue', venue);
          user.likes.push(venue);
          user.save();
          sendJsonResponse(res, 200, {'status': 'complete', 'likes': user.likes});

        });
      } else {
        arr.splice(pos, 1);
        user.save();
        sendJsonResponse(res, 200, {'status': 'complete', 'likes': user.likes});
      }
    });
  }
};