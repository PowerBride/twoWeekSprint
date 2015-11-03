//menues 

$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();

  var places = [
    {
      id: 'a',
      maxCap: 150,
      styles: ['beach', 'garden']
    },
    {
      id: 'b',
      maxCap: 200,
      styles: ['beach']
    },
      {
      id: 'c',
      maxCap: 250,
      styles: ['garden']
    },
      {
      id: 'd',
      maxCap: 100,
      styles: ['beach', 'garden']
    },
    {
      id: 'e',
      maxCap: 100,
      styles: ['garden']
    }
  ];

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
      venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
      venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

      console.log('filters', venues.styles, venues.maxCap);

      filter.empty.call(venues, 'list');
      filters.call(venues, 'list', places, 'maxCap', venues.maxCap, 'styles', venues.styles, filter);
      console.log('possible places', venues.list);
    });

    $('.capacity-radio').change(function(){
      venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
      venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

      console.log('filters', venues.styles, venues.maxCap);

      filter.empty.call(venues, 'list');
      filters.call(venues, 'list', places, 'maxCap', venues.maxCap, 'styles', venues.styles, filter);
      console.log('possible places', venues.list);
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
      //if so, add the searched obj to list if it's type is less than or equal to filter or if the filter is 0 
      if(type === 'maxCap'){
        if(arr[i][type] <= filterList[j] || filterList[j] === 0){
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

function Venues(){
  this.list = [];
  this.maxCap = [];
  this.styles = [];
}

function filters(list, arr, type1, filterList1, type2, filterList2, filter){
  var viewArr = [],
      arr1 = [],
      i = 0;

  arr1 = filter.applyFilter(arr, type1, filterList1);
  viewArr = filter.applyFilter(arr1, type2, filterList2);

  for(i; i < viewArr.length; i++){
    filter.setAttr.call(this, list, viewArr[i]);
  }
}

// filter.setAttr.call(venues, 'maxCap', 100);
// filter.setAttr.call(venues, 'styles', 'rustic');

// filters.call(venues, 'list', places, 'maxCap', venues.maxCap, 'styles', venues.styles);
