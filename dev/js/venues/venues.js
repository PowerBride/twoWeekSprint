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
