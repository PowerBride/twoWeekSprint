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

// module.exports.getAll = function(req, res){
//   bpModel.find().exec(function(err, entries){
//     if(err){
//       sendJsonResponse(res, 404, {'status': 'something went wrong'});
//     }

//     console.log('find complete');
//     sendJsonResponse(res, 200, entries);
//   });
// };

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