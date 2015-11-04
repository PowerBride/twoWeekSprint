//menues 

$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();

  //handlebars
  var source = '<div class="venues-venue" id="{{venues-venue-name}}"><div class="venue-img"><img src="{{venues-venue-img}}" alt=""></div><h1>{{venues-venue-name}}</h1></div>';

  // var source2 = $("#venues-venue-cover-template").html();

  var template = Handlebars.compile(source);

  var context = '',
      html;

  venues.getVenuesByLocation('sf', function(){
    
    createList();

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
      createList();
    });

    $('.capacity-radio').change(function(){
      createList();
    });

  });


  function createList(){
    filter.empty.call(venues, 'list');
    clean('#venues-select');

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

        if(el.name === bel.name){
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

});