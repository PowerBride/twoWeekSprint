function clean(el){
  $(el).html('');
  return el;
}

function checkObjInArray(el, arr){
  var i = 0;
  for(i; i < arr.length; i++){
    if(arr[i]._id === el._id){
      return true;
    }
  }
  return false;
}

function toggleClass($el, cls){
  $el.toggleClass(cls);
}

function toggleLiked($el){
  toggleClass($el, 'liked');
  toggleClass($el, 'fa-heart-o');
  toggleClass($el, 'fa-heart');
}

function pathName(path){
  var venues = '/venues/';
  var index = venues.length;

  if(path.indexOf(venues) === 0){
    return path.slice(index, path.length);
  }
}
//filter obj
// var filter = {
//   styles: [],
//   capacity: 0,
//   setParam: function(args){
//   },
//   checkParam: function(args){
//     //check if number or arr
//     if(typeof args === 'number'){
//       return 'number';
//     } else {
//       return 'array';
//     }
//   }
// };

// emptys attrs
// add item to attr
// get item from arr

// accesses view obj
// applies filter option to view obj

function Filter(){
}

Filter.prototype.empty = function(type){
  this[type] = [];
};

Filter.prototype.setAttr = function(attr, item){
  this[attr].push(item);
};

Filter.prototype.applyFilter = function(arr, type, filterList){
  var i = 0,
      j,
      k,
      resArr = [],
      check = true;

  console.log(arr, type, filterList);

  for(i; i < arr.length; i++){
    for(j=0; j<filterList.length; j++){
      
      //check if maxCap is filter. 
      //if so, add the searched obj to list if it's type is less than or equal to filter or if the filter is 0 
      if(type === 'capacity'){
        if(arr[i][type] <= filterList[j] || filterList[j] === 0){

          check = checkObjInArray(arr[i], resArr);
          if(!check){
            resArr.push(arr[i]);
          }
        }

      //check if styles is filter.
      //if so, add the searched obj to list if anything in its type array === filter
      } else if (type === 'styles'){
        for(k=0; k< arr[i][type].length; k++){

          if(arr[i][type][k] === filterList[j]){

            check = checkObjInArray(arr[i], resArr);

            if(!check){
              resArr.push(arr[i]);
            }
            
          }
        }
      }
    }
  }
  console.log('resArr', resArr);
  return resArr;
};

  


function venueFilterFuncs(){
}

venueFilterFuncs.prototype.selectAll = function(el){
  var i = 0,
  els = $(el),
  arr = [];

  for(i; i<els.length; i++){
    arr.push(els[i].value);
  }

  return arr;
};

venueFilterFuncs.prototype.checkOptions = function(el, type){
  //runs through all available options on the type
  //checks what is checked
  //returns arr of checked vals

  var i = 0,
      els = $(el),
      arr = [];

  console.log(els);

  for(i; i < els.length; i++){
    if(els[i].checked){
      if(type === 'capacity'){
        arr.push(parseInt(els[i].value, 10));
      } else {
        arr.push(els[i].value);
      }
    }
  }

  //check if no filters selected for styles
  if(type === 'styles' && arr.length === 0){
    return this.selectAll(el);
  }

  return arr;
};


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
$('document').ready(function(){

  $('.ui.sticky')
    .sticky()
  ;

  $('.singleVenue-carousel').slick();

});

$('document').ready(function(){
  var $singleVenueMenu = $('.singleVenue-menu'),
      $venueMenuChildren = $singleVenueMenu.children();

  var carrow = '<i class="fa fa-sort-asc fa-3x menu-carrow"></i>';

  var href = window.location.pathname;
  console.log(href);

  var venueName = pathName(href);

  var venue = new Venue();
  venue.getVenue(venueName, function(){

    venue.setPageName('#venueHeader-title');
    venue.setImgs('img.carousel');


    var $heart = $(venue.setLiked('#singleVenue-carousel'));

    $heart.on('click', function(){
      toggleLiked($heart);
      console.log(venue.liked);
      venue.liked = !venue.liked;
      console.log(venue.liked);

    });
    
  });

  $venueMenuChildren.each(function(){
    var $this = $(this);


    $this.on('click', function(){
      var id = $this.attr('id');
      console.log(id);



      if(!$this.hasClass('active')){
        $this.toggleClass('active').append(carrow);

        $venueMenuChildren.each(function(){
          var $that = $(this);
          if(!$that.is($this) && $that.hasClass('active')){
            toggleClass($that, 'active');
            $that.children().remove();
          }
        });
      }
    });
  });
});
function Venues(){
  this.list = [];
  this.maxCap = [];
  this.styles = [];
  this.available = [];
  this.likes = [];
}

Venues.prototype.contextualizeVenue = function(data){

  var context = {
    'venues-venue-name': data.name,
    'venues-venue-src': data.src,
    'venues-venue-img': data.mainImg,
    'venues-venue-liked': data.liked,
    'venues-venue-id': data._id
  };


  return context;
};

Venues.prototype.getVenuesByLocation = function(location, cb){
    var that = this;
    $.get('/api/venues/location/' + location, function(data){
      that.available = data;
      console.log("THAT", that);
      
      cb();
    });
};

Venues.prototype.getLikes = function(cb){
  var that = this;
  $.get('/api/venues/likes', function(data){
    that.likes = data.likes;
    console.log('this', that);

    cb();
  });
};

Venues.prototype.setLiked = function(id, list, cb){
  var i = 0;
  var arr = this[list];
  
  for(i; i < arr.length; i++){
    if(arr[i]._id === id){
      arr[i].liked = !arr[i].liked;
      cb();
    }

  }
};

Venues.prototype.like = function(id, cb){
  var obj = {
    _id: id
  };
  
  $.post('/api/venues/likes', obj, function(data){
    cb(data);
  });
};


