//menues 

$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();
  var basics = new Basics();

  //handlebars
  var source = '<div class="venues-venue" id="{{venues-venue-name}}"><div class="venue-img"><img src="{{venues-venue-img}}" alt=""></div><h1>{{venues-venue-name}}</h1></div>';

  var source2 = $("#venues-venue-cover-template").html();

  console.log(source2);

  var template = Handlebars.compile(source);


  var context = '',
      html;

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

      basics.clean('#venues-select');
      $('#venues-select').html('');

      for(var i = 0; i < venues.list.length; i++){
        context = venues.contextualizeVenue(venues.list[i]);
        
        html = template(context);

        $('#venues-select').append(html);
      }
    });

    $('.capacity-radio').change(function(){
      venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
      venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

      console.log('filters', venues.styles, venues.maxCap);

      filter.empty.call(venues, 'list');
      filters.call(venues, 'list', venues.available, 'maxCap', venues.maxCap, 'styles', venues.styles, filter);
      console.log('possible places', venues.list);

      basics.clean('#venues-select');
      $('#venues-select').html('');

      for(var i = 0; i < venues.list.length; i++){
        context = venues.contextualizeVenue(venues.list[i]);

        console.log(context);
        
        html = template(context);

        console.log(html);

        $('#venues-select').append(html);
      }
    });

  });

  

  

});