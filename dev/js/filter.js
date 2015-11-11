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

  

