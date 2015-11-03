//menues 

$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();


  venues.getVenuesByLocation('sf', function(){

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
      filters.call(venues, 'list', venues.available, 'maxCap', venues.maxCap, 'styles', venues.styles, filter);
      console.log('possible places', venues.list);
    });

    $('.capacity-radio').change(function(){
      venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
      venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

      console.log('filters', venues.styles, venues.maxCap);

      filter.empty.call(venues, 'list');
      filters.call(venues, 'list', venues.available, 'maxCap', venues.maxCap, 'styles', venues.styles, filter);
    });



  });

  

  

});