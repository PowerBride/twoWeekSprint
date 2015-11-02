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

// var number = 0;
// var arr = ['this', 'is', 'an', 'array'];

// console.log(filter.checkParam(number));
// console.log(filter.checkParam(arr));

