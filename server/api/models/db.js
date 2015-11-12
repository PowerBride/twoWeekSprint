var mongoose = require('mongoose');

var config = require('../../config');

var user = config.mongolab_username();
var password = config.mongolab_password();
var uri = config.mongolab_uri();
var mongolabUri = 'mongodb://' + user + ':' + password + uri;

var app = 'powerbride';
var URI = 'mongodb://localhost/' + app;

if (process.env.NODE_ENV === 'production'){
  var URI = mongolabUri;
}

mongoose.connect(URI);


//Connection Events
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to:', URI);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection err:', err);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});


//Graceful Shutdown
var gracefulShutdown = function(msg, cb){
  mongoose.connection.close(function(){
    console.log('Mongoose connection closed through', msg);
    cb();
  });
};

//event listens
process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGNIT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  gracefulShutdown('Heroku App Shutdown', function(){
    process.exit(0);
  });
});


//require models
require('./user.js');