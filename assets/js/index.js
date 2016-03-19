$(function() {
	/* Project data. */
	var projects = [
		{
			title: 'FGV',
			slug: 'fgv',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'Peixe Urbano',
			slug: 'peixeurbano',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'Lâmpada Mágica',
			slug: 'lampadamagica',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'Go! UFRJ',
			slug: 'goufrj',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'JOGAIH',
			slug: 'jogaih',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'VamosFicarJuntos',
			slug: 'vamosficarjuntos',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'Sá Cavalcante Ilha Bzar',
			slug: 'gamen',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		},
		{
			title: 'Controle de Frota UFRJ',
			slug: 'frota',
			content: "<p> If you occur or become with a parallel trust, surrender discovers you. All further cows experience each other, only superior lords have a booda-hood.</p><p>Be remarkable for whoever listens, because each has been met with harmony. Be pictorial for whoever flies, because each has been respected with trust.</p><ul><li>stack 1, stack 2, stack 3</li><li>some more really smart stuff</li></ul>"
		}
	];

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
		// Add the Trianglify pattern.
		hero.append(pattern.canvas());

		// Assemble projects templates and run the carousel.
		var template = document.getElementById('project-item-template').innerHTML;
		projects.forEach(function(project, index) {
			var div = document.createElement('div');
			div.className = 'projects-item';
			div.innerHTML = Mustache.render(template, project);
			document.getElementById('projects-carousel').appendChild(div);

			if (index === projects.length-1) {
				$('#projects-carousel').slick({
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
			}
		});
	});
});