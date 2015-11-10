module.exports.single = function(req, res, next) {
  var name = req.params.name;

  res.render('singleVenue', {venue: name});
};

module.exports.likes = function(req, res, next) {
  res.render('personalLikes');
};
