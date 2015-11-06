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
  });

  $venueMenuChildren.each(function(){
    var $this = $(this);


    $this.on('click', function(){
      var id = $this.attr('id');
      console.log(id);



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