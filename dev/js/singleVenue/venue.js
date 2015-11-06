function Venue(){
  this.name = '';
  this._id = '';
  this.imgs = [];
}

Venue.prototype.getVenue = function(name, cb){
  var that = this;
    
  $.get('/api/venues/' + name, function(data){
      that.name = data.name;
      that._id = data._id;
      that.imgs = data.imgs;
      
      cb();
    });

};

Venue.prototype.setPageName = function(el){
  var $title = $(el + '> h1');

  $title.html(this.name);
};

Venue.prototype.setImgs = function(el){
  var $carousel = $(el);
  var i = this.imgs.length - 1;
  var length = this.imgs.length - 1;

  var that = this;

  $carousel.each(function(){

  console.log(that);
  $(this).attr('src', that.imgs[i]);
  console.log(that.imgs);
  console.log(that.imgs[i]);
  console.log(i);
  if(i === length){
    i = 0;
  } else {
    i++;
  }
  });
};