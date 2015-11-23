var badge = {
	triangles: [],
	trianglesTarget: [],
	steps: 20,
	step: 0,
	axisCount: 9,
	trianglesCount: 30,
	colorRange: [0,20,49,99,  255,21,50,100], // rgba start - end

	init: function() {
		badge.triangles = [];
		badge.angle = (2*Math.PI)/badge.axisCount;
		for (var i=0; i<badge.trianglesCount; i++){
			var a1 = Math.floor(Math.random() * 9);
			var a2 = Math.floor(Math.random() * 9);
			var v1 = Math.random() * 50 + 50;
			var v2 = Math.random() * 50 + 50;

			var x1 = v1 * Math.cos(a1*badge.angle)+100;
			var y1 = v1 * Math.sin(a1*badge.angle)+100;
			var x2 = v2 * Math.cos(a2*badge.angle)+100;
			var y2 = v2 * Math.sin(a2*badge.angle)+100;

			var r = Math.floor(Math.random() * (badge.colorRange[4] - badge.colorRange[0])) + badge.colorRange[0];
			var g = Math.floor(Math.random() * (badge.colorRange[5] - badge.colorRange[1])) + badge.colorRange[1];
			var b = Math.floor(Math.random() * (badge.colorRange[6] - badge.colorRange[2])) + badge.colorRange[2];
			var alpha = Math.floor(Math.random() * (badge.colorRange[7] - badge.colorRange[3])) + badge.colorRange[3];
			alpha = alpha/255.0;
			badge.triangles.push([x1,y1,x2,y2, r,g,b,alpha]);
		}
		badge.createTarget();
		requestAnimationFrame(badge.update);
	},
	createTarget: function() {
		badge.trianglesTarget = [];
		for (var i=0; i<badge.trianglesCount; i++) {
			var a1 = Math.floor(Math.random() * 9);
			var a2 = Math.floor(Math.random() * 9);
			var v1 = Math.random() * 50 + 50;
			var v2 = Math.random() * 50 + 50;

			var x1 = v1 * Math.cos(a1 * badge.angle) + 100;
			var y1 = v1 * Math.sin(a1 * badge.angle) + 100;
			var x2 = v2 * Math.cos(a2 * badge.angle) + 100;
			var y2 = v2 * Math.sin(a2 * badge.angle) + 100;
			badge.trianglesTarget.push([x1,y1,x2,y2]);
		}
	},
	interpolate: function(delta) {
		badge.step += delta;
		if (badge.step < badge.steps) {
			for (var i = 0; i < badge.trianglesCount; i++) {
				var x1 = (badge.trianglesTarget[i][0] - badge.triangles[i][0]) / (badge.steps - badge.step);
				x1 = delta * x1 + badge.triangles[i][0];
				var y1 = (badge.trianglesTarget[i][1] - badge.triangles[i][1]) / (badge.steps - badge.step);
				y1 = delta * y1 + badge.triangles[i][1];
				var x2 = (badge.trianglesTarget[i][2] - badge.triangles[i][2]) / (badge.steps - badge.step);
				x2 = delta * x2 + badge.triangles[i][2];
				var y2 = (badge.trianglesTarget[i][3] - badge.triangles[i][3]) / (badge.steps - badge.step);
				y2 = delta * y2 + badge.triangles[i][3];

				badge.triangles[i][0] = x1;
				badge.triangles[i][1] = y1;
				badge.triangles[i][2] = x2;
				badge.triangles[i][3] = y2;
			}
		} else {
			if (badge.step >= badge.steps * 2) {
				badge.step = 0;
				badge.createTarget();
			}
		}
	},
	drawTriangles: function() {
		var s = "";
		for (var i in badge.triangles) {
			var t = badge.triangles[i];
			s += '<path d="M100 100L' + t[0] + ' ' + t[1] + 'L' + t[2] + ' ' + t[3] + 'Z" style="fill:rgba(';
			s += t[4] + "," + t[5] + "," + t[6] + "," + t[7] + ');" />';
		}
		return s;
	},
	draw: function() {
		var svg = '<svg viewBox="0 0 200 200">';
		svg += badge.drawTriangles();
		svg += '</svg>';
		$('.logo').html(svg);
	},
	update: function() {
		badge.interpolate(0.1);
		badge.draw();

		requestAnimationFrame(badge.update);
	}
};

badge.init();
$(badge.draw);