$(document).ready(function() {

  /*--------Navbar + Hamburger Icon----------------*/

  var menu = $(".menu");
      $(window).resize(function(){
        $(".menu-toggle").removeClass("active");
        if($(window).innerWidth() > 640){
          menu.show();
        } else {
          menu.hide();
        }
      });
      $(".menu-toggle").click(function(){
        $(this).toggleClass("active");
        menu.slideToggle();
      });

  /*-----Shows more info about election events--------*/

  $(".more-items").click(function() {
    $(this).find(".more").slideToggle();
  });

	/*---------IMG Slider---------*/

	$('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
      var animateLeft, slideLeft;

      advance();

      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }

      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');

      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }

      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }

    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }

    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });

    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(9);
      }
    });

    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');

      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });

    advance();
	});


	/*--------lightbox------*/

	var gallery = $('.gallery');

	var overlay = $ ('<div/>', { id: 'overlay' });
		overlay.appendTo('body').hide();

	gallery.find('a').on('click', function(event){

		var href = $(this).attr('href'),

			image = $('<img>', {src: href, alt: ''});

		overlay.html(image).show();

		event.preventDefault();
	});

	overlay.on('click',function(){
		overlay.hide();
	});

	$(document).on('keyup', function(event){

		if (event.which === 27)overlay.hide();
	});


	/*--------- scroll ---------*/

	var menu = $('.menu'),
		menuLinks = menu.find('a');

	menuLinks.on('click', function(event){
		event.preventDefault();

		var id = this.hash;

		$('html, body').animate({scrollTop: $(id).offset().top}, 600, function(){
			window.location.hash = id;
		})
	});

});