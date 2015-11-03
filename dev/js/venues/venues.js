// venues
  // venues obj
      // name
      // location
      // favorited (t/f)
      // styles []
      // capacity: int
      // landing-img
  // view-venues arr
      // name
      // favorited (t/f)
      // landing-img
      // src?
  
  //on page load
    // 1. set initial variables
    //   - no style filter set
    //   - no capacity limitor set
    //   - on click functions for different parts of filters 
    // 2. create venues obj based on location 
    //   http call to backend 
    //   returns json 
    // 3. create view-venues arr based upon filters
    // 4. render view-venues arr based on template
    // 5. on filter select:
    //     rerun 3, 4

function Venues(){
  this.list = [];
  this.maxCap = [];
  this.styles = [];
  this.available = [];
}

Venues.prototype.contextualizeVenue = function(data){

  var context = {
    'venues-venue-name': data.name,
    'venues-venue-img': data.img,
    'venues-venue-liked': data.liked
  };


  return context;
};



Venues.prototype.getVenuesByLocation = function(location, cb){
    var that = this;
    $.get('/api/locations/location/' + location, function(data){
      that.available = data;
      
      cb();
    });
};

function filters(list, arr, type1, filterList1, type2, filterList2, filter){
  var viewArr = [],
      arr1 = [],
      i = 0;

  arr1 = filter.applyFilter(arr, type1, filterList1);

  console.log('after ' + type1 + ', list is', arr1);
  viewArr = filter.applyFilter(arr1, type2, filterList2);

    console.log('after ' + type2 + ', list is', viewArr);

  for(i; i < viewArr.length; i++){
    filter.setAttr.call(this, list, viewArr[i]);
  }
}

// filter.setAttr.call(venues, 'maxCap', 100);
// filter.setAttr.call(venues, 'styles', 'rustic');

// filters.call(venues, 'list', places, 'maxCap', venues.maxCap, 'styles', venues.styles);
