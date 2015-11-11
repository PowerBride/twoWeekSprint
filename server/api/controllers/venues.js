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
              console.log('USER', user.likes[j]._id);
              console.log("VENU", venue._id);

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
  Venue.findOne({src: req.session.name})
  .exec(function(err, venue){
    if(err){
      sendJsonResponse(res, 404, {'error': 'could not find object'});
      
    } else {
      sendJsonResponse(res, 200, venue);
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