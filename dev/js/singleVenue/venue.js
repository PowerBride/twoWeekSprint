function Venue(){
  this.name = '';
  this._id = '';
  this.imgs = [];
  this.liked = false;
}

Venue.prototype.getVenue = function(name, cb){
  var that = this;
    
  $.get('/api/venues/' + name, function(data){
      that.name = data.name;
      that._id = data._id;
      that.imgs = data.imgs;
      that.liked = data.liked;
      
      cb();
    });

};

Venue.prototype.setPageName = function(el){
  var $title = $(el + '> h1');

  $title.html(this.name);
};


//rewrite so that it can hold more than just three images
// do so by appending an actual image div rather than just changing the source of the ones in it
Venue.prototype.setImgs = function(el){
  var $carousel = $(el);
  var i = this.imgs.length - 1;
  var length = this.imgs.length - 1;

  var that = this;

  $carousel.each(function(){

  $(this).attr('src', that.imgs[i]);

  if(i === length){
    i = 0;
  } else {
    i++;
  }
  });
};

Venue.prototype.setLiked = function(el){
  var $carousel = $(el);
  var heart = '';

  console.log('boom!');
  if(this.liked === true){
    heart = '<i id="single-venue-heart" class="fa fa-heart fa-3x liked"></i>';
  } else {
    heart = '<i id="single-venue-heart" class="fa fa-heart-o fa-3x"></i>';
  }

  $carousel.append(heart);

  return '#single-venue-heart';
};

Venue.prototype.setDetails = function(el){

};

Venue.prototype.setReviews = function(el){

};

Venue.prototype.setCalendar = function(el){

};