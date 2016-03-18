$(function() {
	/* Plays the video when scrolling near the area. */
	var aboutElement = $('.about-content');
	var played = false;
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > aboutElement.offset().top + aboutElement.height()) {
			if (!played) {
				//$('#video').get(0).play();
				played = true;
			}
		}
	});

	/* Displays the map. */
	var position = new google.maps.LatLng(-22.949734, -43.187119);
	var mapOptions = {
		center: position,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		title: "Bunker"
	});

	/* Displays the background. */
	var hero = $('.hero');
	var pattern = Trianglify({
		width: hero.width(),
		height: hero.height(),
		x_colors: ["#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
	});

	$(document).ready(function() {
		hero.append(pattern.canvas());

		$('.projects-carousel').slick({
			centerMode: true,
			centerPadding: '18%',
			dots: false,
			responsive: [{
				breakpoint: 1300,
				settings: { centerMode: true, centerPadding: '12%' }
			},{
				breakpoint: 800,
				settings: { centerMode: true, centerPadding: '6%' }
			}]
		});
	});
});