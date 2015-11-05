var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

var entries = [
    {
      _id: '1',
      name: 'GrandView Pavillion',
      img: 'http://loremflickr.com/300/300/dog',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: true,
      maxCap: 250,
      styles: ['beach', 'garden']
    },
    {
      _id: '2',
      name: 'Barlow Events',
      img: 'http://loremflickr.com/300/300/music',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: true,
      maxCap: 150,
      styles: ['barn', 'garden']
    },
    {
      _id: '3',
      name: 'Tank18 Winery',
      img: 'http://loremflickr.com/300/300/winery',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 250,
      styles: ['barn', 'backyard']
    },
    {
      _id: '4',
      name: 'Winemaker Studios',
      img: 'http://loremflickr.com/300/300/cat',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 100,
      styles: ['beach', 'countryclub', 'backyard']
    },
    {
      _id: '5',
      name: 'Hamlin Mansion',
      img: 'http://loremflickr.com/300/300/mansion',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 250,
      styles: ['backyard', 'garden', 'countryclub']
    },
    {
      _id: '6',
      name: 'Firehouse 8',
      img: 'http://loremflickr.com/300/300/house',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 300,
      styles: ['countryclub', 'barn']
    },
    {
      _id: '7',
      name: 'Singe Barrel House',
      img: 'http://loremflickr.com/300/300/bird',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 100,
      styles: ['cityhall', 'garden']
    },
    {
      _id: '8',
      name: 'Ocean Beach',
      img: 'http://loremflickr.com/300/300/beach',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 550,
      styles: ['beach', 'garden']
    },
    {
      _id: '9',
      name: 'Faker Island',
      img: 'http://loremflickr.com/300/300/island',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
      liked: false,
      maxCap: 250,
      styles: ['beach', 'garden', 'backyard']
    },
    {
      _id: '10',
      name: 'Tomer Barn',
      img: 'http://loremflickr.com/300/300/penguin',
      imgs: ['http://loremflickr.com/300/300/dog', 'http://loremflickr.com/300/300/cat', 'http://loremflickr.com/300/300/taylorswift'],
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