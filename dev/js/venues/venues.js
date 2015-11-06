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
    'venues-venue-liked': data.liked,
    'venues-venue-id': data._id
  };


  return context;
};

Venues.prototype.getVenuesByLocation = function(location, cb){
    var that = this;
    $.get('/api/venues/location/' + location, function(data){
      that.available = data;
      
      cb();
    });
};

Venues.prototype.setLiked = function(id, cb){
  var i = 0;
  var arr = this.available;
  
  for(i; i < arr.length; i++){
    if(arr[i]._id === id){
      arr[i].liked = !arr[i].liked;
      cb();
    }

  }


};


