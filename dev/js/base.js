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
    console.log(filts.checkOptions('.styles-checkbox', 'checkbox'));
  });

  $('.capacity-radio').change(function(){
    console.log(filts.checkOptions('.capacity-radio', 'radio'));
  });



});