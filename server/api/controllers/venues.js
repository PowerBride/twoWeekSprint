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

var entries = [
    {
      _id: '1',
      name: 'GrandView Pavillion',
      src: 'grandviewpavillion',
      img: 'http://loremflickr.com/300/300/dog',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: true,
      maxCap: 250,
      styles: ['beach', 'garden']
    },
    {
      _id: '2',
      name: 'Barlow Events',
      src: 'barlowevents',
      img: 'http://loremflickr.com/300/300/music',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: true,
      maxCap: 150,
      styles: ['barn', 'garden']
    },
    {
      _id: '3',
      name: 'Tank18 Winery',
      src: 'tank18winery',
      img: 'http://loremflickr.com/300/300/winery',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 250,
      styles: ['barn', 'backyard']
    },
    {
      _id: '4',
      name: 'Winemaker Studios',
      src: 'winemakerstudios',
      img: 'http://loremflickr.com/300/300/cat',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 100,
      styles: ['beach', 'countryclub', 'backyard']
    },
    {
      _id: '5',
      name: 'Hamlin Mansion',
      src: 'hamlinmansion',
      img: 'http://loremflickr.com/300/300/mansion',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 250,
      styles: ['backyard', 'garden', 'countryclub']
    },
    {
      _id: '6',
      name: 'Firehouse 8',
      src: 'firehouse8',
      img: 'http://loremflickr.com/300/300/house',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 300,
      styles: ['countryclub', 'barn']
    },
    {
      _id: '7',
      name: 'Singe Barrel House',
      src: 'singebarrelhouse',
      img: 'http://loremflickr.com/300/300/bird',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 100,
      styles: ['cityhall', 'garden']
    },
    {
      _id: '8',
      name: 'Ocean Beach',
      src: 'oceanbeach',
      img: 'http://loremflickr.com/300/300/beach',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 550,
      styles: ['beach', 'garden']
    },
    {
      _id: '9',
      name: 'Faker Island',
      src: 'fakerisland',
      img: 'http://loremflickr.com/300/300/island',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 250,
      styles: ['beach', 'garden', 'backyard']
    },
    {
      _id: '10',
      name: 'Tomer Barn',
      src: 'tomerbarn',
      img: 'http://loremflickr.com/300/300/penguin',
      imgs: ['http://loremflickr.com/600/300/dog', 'http://loremflickr.com/600/300/cat', 'http://loremflickr.com/600/300/soccer'],
      liked: false,
      maxCap: 300,
      styles: ['barn', 'garden']
    }
];

module.exports.getAll = function(req, res){
  Venue.find().exec(function(err, entries){
    if(err){
      sendJsonResponse(res, 404, {'status': 'something went wrong'});
    }

    console.log('find complete');
    sendJsonResponse(res, 200, entries);
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
  sendJsonResponse(res, 200, entries);
};

module.exports.getSingle = function(req, res){
  var el = find(entries, req.params.name);

  if(el !== -1){
    sendJsonResponse(res, 200, el);
  } else {
    sendJsonResponse(res, 400, {'error': 'could not find object'});
  }
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
      sendJson(res, 200, yser);
    });
  }
};

module.exports.setLike = function(req, res){
  if(!req.session.userId){
    sendJsonResponse(res, 400, {'error': 'user not logged in'});
  } else {
    
    User.findOne({_id: req.session.userId})
    .exec(function(err, user){
      if(err){
        sendJsonResponse(res, 404, {'status': 'user could not be found'});
      }

      var arr = user.likes;
      var pos = arr.indexOf(req.body._id);
      if(pos !== -1){
        Venue.findOne({_id: req.body._id})
        .exec(function(err, venue){
          if(err){
            sendJsonResponse(res, 400, {'status': 'venue with provided ID could not be found'});
          }
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