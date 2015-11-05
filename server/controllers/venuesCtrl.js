module.exports.single = function(req, res, next) {
  var name = req.params.name;

  res.render('singleVenue', {venue: name});
};
