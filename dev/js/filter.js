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

  
function createList(){
  filter.empty.call(venues, 'list');
  basics.clean('#venues-select');

  venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
  venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

  var arr1 = [];
  var arr2 = [];
  var arr = [];
  var i = 0;
  var j = 0;
  var k = 0;

  arr1 = filter.applyFilter(venues.available, 'maxCap', venues.maxCap);

  arr2 = filter.applyFilter(venues.available, 'styles', venues.styles);
  
  arr1.forEach(function(el){
    arr2.forEach(function(bel){
      console.log('hi');

      if(el.name === bel.name){
        console.log('hit!');
        arr.push(el);
      }
    });
  });

  venues.list = arr;

  for(k; k < arr.length; k++){
    context = venues.contextualizeVenue(arr[k]);
    html = template(context);

    $('#venues-select').append(html);
  }
}
