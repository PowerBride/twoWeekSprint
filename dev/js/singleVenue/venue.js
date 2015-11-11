function Venue(){
  this.name = '';
  this._id = '';
  this.images = [];
  this.liked = false;
  this.bookedDates = [];
  this.reviews = [];
  this.description = '';
  this.styles = [];
  this.services = [];
  this.capacity = 0;
  this.timeRestrictions = '';
  this.rentalFees = '';
  this.rentalFeeMin = 0;
  this.rentalFeeMax = 0;
  this.amenities = [];
  this.specialRestrictions = '';
  this.alcohol = '';
  this.address = '';
  this.coords = [];
}

Venue.prototype.getVenue = function(name, cb){
  var that = this;
    
  $.get('/api/venues/' + name, function(data){
      that.name = data.name;
      that._id = data._id;
      that.images = data.images;
      that.liked = data.liked;
      that.bookedDates = data.bookedDates;
      that.reviews = data.reviews;
      that.description = data.description;
      that.styles = data.styles;
      that.services = data.services;
      that.capacity = data.capacity;
      that.timeRestrictions = data.timeRestrictions;
      that.rentalFees = data.rentalFees;
      that.rentalFeeMax = data.rentalFeeMax;
      that.rentalFeeMin = data.rentalFeeMin;
      that.amenities = data.amenities;
      that.specialRestrictions = data.specialRestrictions;
      that.alcohol = data.alcohol;
      that.address = data.address;
      that.coords = data.coords;
      
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
  var i = this.images.length - 1;
  var length = this.images.length - 1;

  var that = this;

  $carousel.each(function(){

  $(this).attr('src', that.images[i]);

  if(i === length){
    i = 0;
  } else {
    i++;
  }
  });
};

Venue.prototype.setLiked = function(el, cb){
  console.log(this);
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

Venue.prototype.like = function(name, cb){
  var obj = {
    src: name
  };
  
  $.post('/api/venues/like', obj, function(data){
    cb(data);
  });
};

Venue.prototype.setDetails = function(el, desc){
  var $desc = $(el);

  var source = '<div id="description-field"> <h3>{{venue-name}}</h3> <p class="address-text"> {{venue-address}} </p> <p class="description-text"> {{venue-description}} </p> <h3>Venue Styles</h3> {{#each styles}} <span class="styles-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}} <h3>Venue Services</h3> {{#each services}} <span class="services-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}} <h3>Wedding Cost</h3> {{rentalFees}} <h3>Notes</h3> {{#if amenities}} <h4>Amenities</h4> {{#each amenities}} <span class="amenities-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}} {{/if}} {{#if specialRestrictions}} <h4>Special Restrictions</h4> <p class="special-text">{{specialRestrictions}}</p> {{/if}} {{#if Alcohol}} <h4>Alcohol</h4> <p class="alcohol-text">{{alcohol}}</p> {{/if}} </div>';


  var template = Handlebars.compile(source);

  var context = contextualizeDesc(desc),
      html= template(context);
  
  $desc.html('').append(html);
};

Venue.prototype.setReviews = function(el){

};

Venue.prototype.setCalendar = function(el){

};

function contextualizeDesc(data){
  var context = {
    'venue-name': data.name,
    'venue-address': data.address,
    'venue-description': data.description,
    'styles': data.styles,
    'services': data.services,
    'rentalFees': data.rentalFees,
    'amenities': data.amenities,
    'specialRestrictions': data.specialRestrictions,
    'alcohol': data.alcohol
  };

  return context;
}