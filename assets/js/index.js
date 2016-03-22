$(function() {
	/* Project data. */
	var projects = [
		{
			title: 'FGV',
			slug: 'fgv',
			content: "<p><a href='http://fgv.br/' target='_blank'>Fundação Getúlio Vargas</a> is a higher education school and research center ranked as one of the top think tanks in the world.</p>" +
				"<p>We partnered with <a href='http://dapp.fgv.br' target='_blank'>DAPP-FGV</a> to develop tools and APIs that applies their research on data analysis into realtime dashboards and infographics available on the web. Frontend design by <a href='http://cafe.art.br' target='_blank'>Café.art.br</a>.</p>",
			stack: [
				"python",
				"django",
				"postgresql"
			]

		},
		{
			title: 'Peixe Urbano',
			slug: 'peixeurbano',
			content: "<p><a href='http://peixeurbano.com.br' target='_blank'>Peixe Urbano</a> is Brazil's largest daily deal site. It enables users to find and purchase deals on local services and products.</p>" +
				"<p>We worked together with their product team to quickly ship highly scalable hotsites that leveraged gamification mechanics for massive marketing campaings.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"aws"
			]
		},
		{
			title: 'Lâmpada Mágica',
			slug: 'lampadamagica',
			content: "<p><a href='http://lampadamagica.net' target='_blank'>Lâmpada Mágica</a> is an app that connects customers with a shopping center retailers to find the best deals and products. It is being developed under a partnership with <a href='http://sacavalcante.com.br' target='_blank'>Sá Cavalcante</a>, a real state and shopping center company.</p>" +
				"<p>This project was conceived from the ground up by our team, with a design process involving customers, retailers and the mall administration.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"android",
				"ios",
				"cordova",
				"sass",
				"aws"
			]
		},
		{
			title: 'Go! UFRJ',
			slug: 'goufrj',
			content: "<p>With a grant from <a href='http://www.fundoverde.ufrj.br' target='_blank'>Fundo Verde</a>, we partnered with the machine learning research department of <a href='http://www.coppe.ufrj.br' target='_blank'>COPPE</a> to develop a mobile platform focused on improving the mobility of students and employees of the <a href='http://www.ufrj.br' target='_blank'>Federal University of Rio de Janeiro</a>.</p>" +
				"<p>The platform will connect various sources of transit information and offer better mobility choices for the users and incentives to reduce their carbon footprint.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"angular2",
				"ionic2",
				"android",
				"ios",
				"sass",
				"aws"
			]
		},
		{
			title: 'JOGAIH',
			slug: 'jogaih',
			content: "<p><a href='http://www.jogaih.com.br' target='_blank'>Jogaih</a> is a game that you play using the movie screen as your display and your mobile device as the gamepad.</p>" +
				"<p>The user is presented with a quiz during the movie trailers that awards points for correct answers. Those points can be traded by snacks and other prizes.</p>" +
				"<p>The product also allows the cinema to engage with the users and receive detailed reports about the players.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"angular",
				"ionic",
				"android",
				"ios",
				"sass",
				"aws"
			]
		},
		{
			title: 'VamosFicarJuntos',
			slug: 'vamosficarjuntos',
			content: "<p>VamosFicarJuntos is a marketing campaign created for <a href='http://sacavalcante.com.br' target='_blank'>Sá Cavalcante</a> shopping centers in a partnership with <a href='http://www.oestudio.com.br' target='_blank'>OEstudio</a> and <a href='http://www.olivierotoscanistudio.com' target='_blank'>Oliviero Toscani</a>. The malls were equipped with a professional photography studio signed by Oliviero Toscani. Over 3 thousand people were photographed.</p>" +
				"<p>The photos were published in realtime and the most popular ones were projected over the mall facades. Users could also print and share their photos in kiosks or with their smartphones.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"aws"
			]
		},
		{
			title: 'Sá Cavalcante Ilha Bzar',
			slug: 'gamen',
			content: "<p>Ilha Bzar is a performance review webapp that leverages gamification and social mechanics to engage employees and managers in continuous coaching and feedback.</p>" +
				"<p>The project was developed in collaboration with <a href='http://estudiopira.com' target='_blank'>Estúdio Pira</a> for <a href='http://sacavalcante.com.br' target='_blank'>Sá Cavalcante</a> with a strong emphasis on storytelling and user experience.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"backbone",
				"javascript",
				"aws"
			]
		},
		{
			title: 'Controle de Frota UFRJ',
			slug: 'frota',
			content: "<p>With a grant from <a href='http://www.fundoverde.ufrj.br' target='_blank'>Fundo Verde</a>, we partnered with the machine learning research department of <a href='http://www.coppe.ufrj.br' target='_blank'>COPPE</a> to develop a fleet management system for <a href='http://www.ufrj.br' target='_blank'>Federal University of Rio de Janeiro</a>.</p>" +
				"<p>The system features a carpooling algorithm to reduce costs and carbon footprint, mobile car requesting apps and a realtime dashboard & administrative webapp.</p>",
			stack: [
				"python",
				"django",
				"mysql",
				"javascript",
				"angular2",
				"ionic2",
				"android",
				"ios",
				"sass",
				"aws"
			]
		}
	];

	/* Plays the video when scrolling near the area. */
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

	/* Prepare templates. */
	var template = document.getElementById('project-item-template').innerHTML;
	Mustache.parse(template);

	$(document).ready(function() {
		// Add the Trianglify pattern.
		hero.append(pattern.canvas());

		// Assemble projects templates and run the carousel.
		projects.forEach(function(project, index) {
			var div = document.createElement('div');
			div.className = 'projects-item';
			div.innerHTML = Mustache.render(template, project);
			project.stack.forEach(function(item) {
				var listItem = document.createElement('li');
				listItem.innerHTML = item;
				div.querySelector('.projects-item-stack').appendChild(listItem);
			});
			document.getElementById('projects-carousel').appendChild(div);

			if (index === projects.length-1) {
				$('#projects-carousel').slick({
					centerMode: true,
					centerPadding: '18%',
					dots: true,
					arrows: false,
					autoplay: true,
					autoplaySpeed: 6000,
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