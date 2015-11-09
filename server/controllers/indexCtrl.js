module.exports.index = function(req, res, next) {
  req.currentUser(function(){
    console.log(req.user, 'usr');
    console.log(req.session.userId, 'id');
    res.render('index', {title: 'PowerBride'});
  });
  
};
