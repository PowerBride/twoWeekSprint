//menues 

$(document).ready(function(){
  var filts = new venueFilterFuncs();

  //on-click styles opacity 
  $('#menu-styles').on('click', function(){
    var opac = $('#menu-styles-options').css('opacity');

    if(opac === '1'){
      $('#menu-styles-options').css('opacity', '0');
    } else {
      $('#menu-styles-options').css('opacity', '1');
    }
    
  });

  $('#menu-capacity').on('click', function(){
    var opac = $('#menu-capacity-options').css('opacity');

    if(opac === '1'){
      $('#menu-capacity-options').css('opacity', '0');
    } else {
      $('#menu-capacity-options').css('opacity', '1');
    }
    
  });


    $('.styles-checkbox').change(function(){
      console.log(filts.checkOptions('.styles-checkbox', 'styles'));
      console.log(filts.checkOptions('.capacity-radio', 'capacity'));

    });

    $('.capacity-radio').change(function(){
      console.log(filts.checkOptions('.styles-checkbox', 'styles'));
      console.log(filts.checkOptions('.capacity-radio', 'capacity'));
    });
 






});
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
      resArr = [];

  for(i; i < arr.length; i++){
    for(j=0; j<filterList.length; j++){
      
      //check if maxCap is filter. 
      //if so, add the searched obj to list if it's type is less than or equal to filter 
      if(type === 'maxCap'){
        if(arr[i][type] <= filterList[j]){
          resArr.push(arr[i]);
        }

      //check if styles is filter.
      //if so, add the searched obj to list if anything in its type array === filter
      } else if (type === 'styles'){
        for(k=0; k< arr[i][type].length; k++){
          if(arr[i][type][k] === filterList[j]){
            resArr.push(arr[i]);
          }
        }
      }
    }
  }

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

var filter = new Filter();

var venues = {
  list: [],
  maxCap: [],
  styles: [],
};

var places = [
  {
    id: 'a',
    maxCap: 100,
    styles: ['rustic', 'charming']
  },
  {
    id: 'b',
    maxCap: 80,
    styles: ['rustic']
  },
    {
    id: 'c',
    maxCap: 50,
    styles: ['charming']
  },
    {
    id: 'd',
    maxCap: 60,
    styles: ['rustic', 'charming']
  },
  {
    id: 'e',
    maxCap: 100,
    styles: ['charming']
  }
];

filter.setAttr.call(venues, 'maxCap', 100);
filter.setAttr.call(venues, 'styles', 'rustic');

function filters(list, arr, type1, filterList1, type2, filterList2){
  var viewArr = [],
      arr1 = [],
      i = 0;

  arr1 = filter.applyFilter(arr, type1, filterList1);
  console.log(arr1, 'arr1');
  viewArr = filter.applyFilter(arr1, type2, filterList2);
  console.log(viewArr, 'viewArr');

  for(i; i < viewArr.length; i++){
    filter.setAttr.call(this, list, viewArr[i]);
  }
}

filters.call(venues, 'list', places, 'maxCap', venues.maxCap, 'styles', venues.styles);
