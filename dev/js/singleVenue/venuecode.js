$('document').ready(function(){
  var $singleVenueMenu = $('.singleVenue-menu'),
      $venueMenuChildren = $singleVenueMenu.children();

  var carrow = '<i class="fa fa-sort-asc fa-3x menu-carrow"></i>';

  var href = window.location.pathname;
  console.log(href);

  var venueName = pathName(href);

  var venue = new Venue();

  venue.getVenue(venueName, function(){

    venue.setPageName('#venueHeader-title');
    venue.setImgs('img.carousel');
    venue.setDetails('#singleVenue-description', venue);


    var $heart = $(venue.setLiked('#singleVenue-carousel'));

    $heart.on('click', function(){
      toggleLiked($heart);
      console.log(venue.liked);
      venue.liked = !venue.liked;
      console.log(venue.liked);

      venue.like(venueName, function(el){
        console.log(el);
      });
    });
    
  });

  $venueMenuChildren.each(function(){
    var $this = $(this);


    $this.on('click', function(){
      var id = $this.attr('id');
      console.log(id);

      switch(id){
        case 'details':
          venue.setDetails('#singleVenue-description', venue);
          break;
        case 'reviews':
          $('#singleVenue-description').html('REVIEWS will go here');
          break;
        case 'calendar':
          $('#singleVenue-description').html('Calendar will go here');
          break;
      }

      if(!$this.hasClass('active')){
        $this.toggleClass('active').append(carrow);

        $venueMenuChildren.each(function(){
          var $that = $(this);
          if(!$that.is($this) && $that.hasClass('active')){
            toggleClass($that, 'active');
            $that.children().remove();
          }
        });
      }
    });
  });
});