function Basics(){
}

Basics.prototype.clean = function(el){
  $(el).html('');
  return el;
};