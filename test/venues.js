var chai = require('chai');
var expect = chai.expect;

var filter = {
  styles: [],
  capacity: 0,
  setParam: function(args){
  },
  checkParam: function(args){
    //check if number or arr
    if(typeof args === 'number'){
      return 'number';
    } else {
      return 'array';
    }
  }
};

describe('filter', function(){
  var number = 0;
  var arr = ['this', 'is', 'an', 'array'];

  describe('checkParam', function(){
    expect('hai').to.equal('hai');
    expect('b').to.equal('a');
    expect(filter.checkParam(number)).to.equal('number');
    expect(filter.checkParam(arr)).to.equal('array');
  });
});