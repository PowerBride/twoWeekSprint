$(document).ready(function(){
  var venFilter = new venueFilterFuncs();
  var venues = new Venues();
  var filter = new Filter();

  //handlebars
  var source = '<div class="venues-venue" id="{{venues-venue-src}}"><div class="venue-img"><a href="/venues/{{venues-venue-src}}"><img src="{{venues-venue-img}}" alt=""></a><div id="{{venues-venue-id}}" class="venue-heart"><i class="fa fa-heart-o fa-2x"></i></div></div><a href="/venues/{{venues-venue-src}}"><h1>{{venues-venue-name}}</h1></a></div></a>';


  var template = Handlebars.compile(source);

  var context = '',
      html;


   venues.getLikes(function(){
    console.log(venues, 'VENUE');
    createLikeList();



    //on-click styles opacity 
    $('#menu-likes-styles').on('click', function(){
      var opac = $('#menu-likes-styles-options').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-styles-options').css('opacity', '0').css('display', 'none');
        $this.css('opacity', '1');
      } else {
        $('#menu-likes-styles-options').css('opacity', '1').css('display', 'block');
        $this.css('opacity', '0');
      }
    });

    $('#menu-likes-styles-options').on('click', function(){
      var opac = $('#menu-likes-styles').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-styles').css('opacity', '0');
        $this.css('opacity', '1').css('display', 'block');
      } else {
        $('#menu-likes-styles').css('opacity', '1');
        $this.css('opacity', '0').css('display', 'none');
      }
    
    });

    $('#menu-likes-capacity').on('click', function(){
      var opac = $('#menu-likes-capacity-options').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-capacity-options').css('opacity', '0').css('display', 'none');
        $this.css('opacity', '1');
      } else {
        $('#menu-likes-capacity-options').css('opacity', '1').css('display', 'block');
        $this.css('opacity', '0');
      }
      
    });

    $('#menu-likes-capacity-options').on('click', function(){
      var opac = $('#menu-likes-capacity').css('opacity');
      var $this = $(this);

      if(opac === '1'){
        $('#menu-likes-capacity').css('opacity', '0');
        $this.css('opacity', '1').css('display', 'block');
      } else {
        $('#menu-likes-capacity').css('opacity', '1');
        $this.css('opacity', '0').css('display', 'none');
      }
      
    });


    $('.styles-likes-checkbox').change(function(){
      createLikeList();
    });

    $('.capacity-likes-radio').change(function(){
      createLikeList();
    });

    $('input[type=checkbox]').on('click', function(){
      var $this = $(this);
      $this.parent().toggleClass('checked-label').toggleClass('unchecked-label');
    });

    $('input[type=radio]').on('click', function(){
      var $this = $(this);
      
      $('input[type=radio]').each(function(){
        var $that = $(this);
      
        var $el = $that.parent();
        if($el.hasClass('checked-radio') && !$that.is($this)){
           $el.toggleClass('checked-radio').toggleClass('unchecked-label');
        }
      });


      $this.parent().toggleClass('checked-radio').toggleClass('unchecked-label');
    });

  });


  function createLikeList(){
    filter.empty.call(venues, 'list');
    clean('#venues-likes');

    venues.styles = venFilter.checkOptions('.styles-checkbox', 'styles');
    venues.maxCap = venFilter.checkOptions('.capacity-radio', 'capacity');

    var arr1 = [];
    var arr2 = [];
    var arr = [];
    var i = 0;
    var j = 0;
    var k = 0;
    var $venue;
    var $i;

    arr1 = filter.applyFilter(venues.likes, 'maxCap', venues.maxCap);

    arr2 = filter.applyFilter(venues.likes, 'styles', venues.styles);
    
    arr1.forEach(function(el){
      arr2.forEach(function(bel){

        if(el._id === bel._id){
          arr.push(el);
        }
      });
    });

    venues.list = arr;

    for(k; k < arr.length; k++){
      
      context = venues.contextualizeVenue(arr[k]);
      html = template(context);

      $('#venues-likes').append(html);

      $venue = $('#'+arr[k]._id);
      $i = $venue.children();

      if(arr[k].liked === true){
        toggleLiked($i);
      }


      //SETTING LIKED
      //need to rewrite this once user has been created to also create a backend api call to add to like list

      $i.on('click', function(){
        var $this = $(this);
        var id = $this.parent().attr('id');
        venues.setLiked(id, 'likes', function(){
          toggleLiked($this);
          venues.like(id, function(el){
            console.log(el);
          });
        });
               
      });
    }
  }

});

