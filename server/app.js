var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// requiring db before routes to make sure everything loads in correctly
require('./api/models/db');

var routes = require('./routes/index');
var apiVenuesRoutes = require('./api/routes/venues');
var venuesRoutes = require('./routes/venues');
// var bluePrintModelRoutes = require('./api/routes/bluePrintModel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'dist')));


// sessions
app.use(session({
  //this forces an unitialized session to be saved, uninitialized meaning new but not modified
  saveUninitialized: true,
  //this forces a session to be saved even if it is not modified
  resave: true,
  secret: 'ASuperSecretCookieSecret', // for testing purposes
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

// server.js
// custom middleware - should go before routes
// adds a currentUser method to the request (req) that can find the user currently logged in based on the request's `session.userId`
app.use('/', function (req, res, next) {
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      if (!user) {
        callback("No User Found", null);
      } else {
        req.user = user;
        callback(null, user);
      }
    });
  };

  next();
});

app.use('/', routes);
app.use('/venues', venuesRoutes);
app.use('/api/venues', apiVenuesRoutes);
// app.use('/api/blueprintmodel', bluePrintModelRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
