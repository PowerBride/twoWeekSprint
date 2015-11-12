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
// Venue.prototype.setImgs = function(el){
//   var $carousel = $(el);
//   var i = this.images.length - 1;
//   var length = this.images.length - 1;

//   var that = this;

//   $carousel.each(function(){

//   $(this).attr('src', that.images[i]);

//   if(i === length){
//     i = 0;
//   } else {
//     i++;
//   }
//   });
// };

Venue.prototype.setImgs = function(el){
  var $carousel = $(el);
  var i = this.images.length - 1;
  var length = this.images.length - 1;
  var j = 0;

  var that = this;
  var html;

  for(j; j < length + 1; j++){
    html = "<div class='venue-carouselImg'><img class='carousel' src="+ that.images[i] + " alt=''></div>";

    $carousel.append(html);
    
    console.log('append!');
    
    if(i === length){
      i = 0;
    } else {
      i++;
    }
  }

  $('.singleVenue-carousel').slick();
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

Venue.prototype.setCal = function(el, venue){
  var $cal = $(el);
  console.log('HA');
  console.log('meow', $cal, '');

  var source = '<div style="height:700px;"><p>Date:</p> <div id="datepicker"></div></div>';

  $cal.html('').append(source);


  $( "#datepicker" ).datepicker({
    numberOfMonths: [2,2],
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('mm/dd/yy', date);
        return [ venue.bookedDates.indexOf(string) == -1 ];
    }
  });

  $("#datepicker").on('change', function(el){
    console.log($(this).val());
  });
};

Venue.prototype.setDetails = function(el, venue){
  var $desc = $(el);

  var source = '<div id="description-field"><p class="address-text"> {{venue-address}} </p> <p class="description-text"> {{venue-description}} </p> <h3>Venue Styles</h3> <div class="ui grid">{{#each styles}} <span class="four wide column stackable styles-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}}</div> <h3>Venue Services</h3> <div class="ui grid">{{#each services}} <span class="four wide column services-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}}</div> <h3>Wedding Cost</h3> <div>{{rentalFees}}</div> <h3 class="notes">Notes</h3> {{#if amenities}} <h4>Amenities</h4> <div class="ui grid">{{#each amenities}} <span class="four wide column stackable amenities-text"><i class="fa fa-check-circle"></i> {{this}}</span> {{/each}}</div> {{/if}} {{#if specialRestrictions}} <h4>Special Restrictions</h4> <div>{{specialRestrictions}}</div> {{/if}} {{#if Alcohol}} <h4>Alcohol</h4> <div>{{alcohol}} </div>{{/if}} </div>';


  var template = Handlebars.compile(source);

  var context = contextualizeDesc(venue),
      html= template(context);
  
  $desc.html('').append(html);
};

Venue.prototype.setReviews = function(el, reviews){
  var $detail = $(el);
  var source = '<div id="review-field" class="ui"> <div id="reviews-number" class="sixteen wide column reviews-number"> <span>{{reviews-number}}</span> reviews <span class="reviews-stars"> {{#each reviews-average-full}} <i class="fa fa-star"></i> {{/each}} {{#each reviews-average-not}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> {{#each review}} <div class="review"> <div class="ui three column grid review-number"> <div class="five wide column rating"> Location <span class="reviews-stars"> {{#each location-full}} <i class="fa fa-star"></i> {{/each}} {{#each location-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> <div class="five wide column rating"> Service <span class="reviews-stars"> {{#each service-full}} <i class="fa fa-star"></i> {{/each}} {{#each service-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> <div class="five wide column rating"> Support <span class="reviews-stars"> {{#each support-full}} <i class="fa fa-star"></i> {{/each}} {{#each support-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> </div> <div class="ui three column grid review-number"> <div class="five wide column rating"> Cleanliness <span class="reviews-stars"> {{#each cleanliness-full}} <i class="fa fa-star"></i> {{/each}} {{#each cleanliness-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> <div class="five wide column rating"> Value <span class="reviews-stars"> {{#each value-full}} <i class="fa fa-star"></i> {{/each}} {{#each value-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> <div class="five wide column rating"> Communication <span class="reviews-stars"> {{#each communication-full}} <i class="fa fa-star"></i> {{/each}} {{#each communication-empty}} <i class="fa fa-star-o"></i> {{/each}} </span> </div> </div> </div> <div class="ui two column grid review-text"> <div class="left floated four wide column user"> <img class="ui avatar image" src="/images/wireframe.png"> <span class="username">{{username}}</span> </div> <div class="right floated twelve wide column review-text"> <p>{{review-text}}</p> </div> </div> {{/each}} </div>';

  var template = Handlebars.compile(source);
  
  var context = contextualizeReviews(reviews),
      html= template(context);

  $detail.html('').append(html);
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

function contextualizeReviews(data){
  var sum = 0,
      average = 0,
      full = [],
      empty = [];

  for(var i = 0; i < data.length; i++){
    sum += data[i].rating;
  }

  average = Math.floor(sum/data.length);

  full = stars(average);
  empty = stars(5 - average);

  var context = {
    "reviews-number": average,
    "reviews-average-full": full,
    "reviews-average-not": empty,
    "review": []
  };

  for(var j = 0; j<data.length; j++){

    var rev = {
      "location-full": stars(data[j].locationRating),
      "location-empty": stars(5 - data[j].locationRating),
      "service-full": stars(data[j].serviceRating),
      "service-empty": stars(5 - data[j].serviceRating),
      "support-full": stars(data[j].supportRating),
      "support-empty": stars(5 - data[j].supportRating),
      "cleanliness-full": stars(data[j].cleanlinessRating),
      "cleanliness-empty": stars(5 - data[j].cleanlinessRating),
      "value-full": stars(data[j].valueRating),
      "value-empty": stars(5 - data[j].valueRating),
      "communication-full": stars(data[j].communicationRating),
      "communication-empty": stars(data[j].communicationRating),
      "username": data[j].author,
      "review-text": data[j].reviewText
    };

    context.review.push(rev);
  }

 return context;
}

function stars(input){
  switch(input){
    case 0:
      return [];
    case 1:
      return [0];
    case 2:
      return [0,0];
    case 3:
      return [0,0,0];
    case 4:
      return [0,0,0,0];
    case 5:
      return [0,0,0,0,0];
  }
}