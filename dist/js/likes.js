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


$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();

  //handlebars
  var source = '<div class="venues-venue" id="{{venues-venue-src}}"><div class="venue-img"><a href="/venues/{{venues-venue-src}}"><img src="{{venues-venue-img}}" alt=""></a><div id="{{venues-venue-id}}" class="venue-heart"><i class="fa fa-heart-o fa-2x"></i></div></div><a href="/venues/{{venues-venue-src}}"><h1>{{venues-venue-name}}</h1></a></div></a>';


  var template = Handlebars.compile(source);

  var context = '',
      html;


   venues.getLikes(function(){

    createLikeList();



    //on-click styles opacity 
    $('#menu-likes-styles').on('click', function(){
      var opac = $('#menu-likes-styles-options').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-styles-options').css('opacity', '0').css('display', 'none');
        $this.css('opacity', '1');
      } else {
        $('#menu-likes-styles-options').css('opacity', '1').css('display', 'block');
        $this.css('opacity', '0');
      }
    });

    $('#menu-likes-styles-options').on('click', function(){
      var opac = $('#menu-likes-styles').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-styles').css('opacity', '0');
        $this.css('opacity', '1').css('display', 'block');
      } else {
        $('#menu-likes-styles').css('opacity', '1');
        $this.css('opacity', '0').css('display', 'none');
      }
    
    });

    $('#menu-likes-capacity').on('click', function(){
      var opac = $('#menu-likes-capacity-options').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-capacity-options').css('opacity', '0').css('display', 'none');
        $this.css('opacity', '1');
      } else {
        $('#menu-likes-capacity-options').css('opacity', '1').css('display', 'block');
        $this.css('opacity', '0');
      }
      
    });

    $('#menu-likes-capacity-options').on('click', function(){
      var opac = $('#menu-likes-capacity').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-capacity').css('opacity', '0');
        $this.css('opacity', '1').css('display', 'block');
      } else {
        $('#menu-likes-capacity').css('opacity', '1');
        $this.css('opacity', '0').css('display', 'none');
      }
      
    });


    $('.styles-likes-checkbox').change(function(){
      createLikeList();
    });

    $('.capacity-likes-radio').change(function(){
      createLikeList();
    });

    $('input[type=checkbox]').on('click', function(){
      var $this = $(this);
      $this.parent().toggleClass('checked-label').toggleClass('unchecked-label');
    });

    $('input[type=radio]').on('click', function(){
      var $this = $(this);
      
      $('input[type=radio]').each(function(){
        var $that = $(this);
      
        var $el = $that.parent();
        if($el.hasClass('checked-radio') && !$that.is($this)){
           $el.toggleClass('checked-radio').toggleClass('unchecked-label');
        }
      });


      $this.parent().toggleClass('checked-radio').toggleClass('unchecked-label');
    });

  });


  function createLikeList(){
    filter.empty.call(venues, 'list');
    clean('#venues-likes');

    venues.styles = venFilter.checkOptions('.styles-likes-checkbox', 'styles');
    venues.maxCap = venFilter.checkOptions('.capacity-likes-radio', 'capacity');

    var arr1 = [];
    var arr2 = [];
    var arr = [];
    var i = 0;
    var j = 0;
    var k = 0;
    var $venue;
    var $i;

    console.log(venues, 'venues');

    arr1 = filter.applyFilter(venues.likes, 'capacity', venues.maxCap);

    arr2 = filter.applyFilter(venues.likes, 'styles', venues.styles);
    
    arr1.forEach(function(el){
      arr2.forEach(function(bel){

        if(el._id === bel._id){
          arr.push(el);
        }
      });
    });

    venues.list = arr;

    for(k; k < arr.length; k++){
      
      context = venues.contextualizeVenue(arr[k]);
      html = template(context);

      $('#venues-likes').append(html);

      $venue = $('#'+arr[k]._id);
      $i = $venue.children();

      if(arr[k].liked === true){
        toggleLiked($i);
      }


      //SETTING LIKED
      //need to rewrite this once user has been created to also create a backend api call to add to like list

      $i.on('click', function(){
        var $this = $(this);
        var id = $this.parent().attr('id');
        venues.setLiked(id, 'likes', function(){
          toggleLiked($this);
          venues.like(id, function(el){
            console.log(el);
          });
        });
               
      });
    }
  }

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


