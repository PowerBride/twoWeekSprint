module.exports.index = function(req, res, next) {
  req.currentUser(function(){
    console.log(req.user, 'usr');
    console.log(req.session.userId, 'id');
    res.render('index', {title: 'PowerBride'});
  });
  
};

module.exports.login = function(req, res, next){
  res.render('login');
};

module.exports.logout = function(req, res, next){
  res.render('logout');
};

module.exports.user = function(req, res, next){
  res.render('user');
};
