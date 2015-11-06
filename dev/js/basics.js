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