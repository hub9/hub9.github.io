$(function() {
	var aboutElement = $('.about-content');
	var played = false;

	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > aboutElement.offset().top + aboutElement.height()) {
			if (!played) {
				$('#video').get(0).play();
				played = true;
			}
		}
	});
});