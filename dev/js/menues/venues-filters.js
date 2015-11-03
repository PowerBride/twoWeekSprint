function venueFilterFuncs(){
}

venueFilterFuncs.prototype.checkOptions = function(el, type){
  //runs through all available options on the type
  //checks what is checked
  //returns arr of checked vals

  var i = 0,
      els = $(el),
      arr = [];

  if(type === 'checkbox'){

    for(i; i < els.length; i++){
      if(els[i].checked){
        arr.push(els[i].value);
      }
    }

  }

  return arr;
};