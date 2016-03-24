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
		badge.createSVG();
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
			
			var r = Math.floor(Math.random() * (badge.colorRange[4] - badge.colorRange[0])) + badge.colorRange[0];
			var g = Math.floor(Math.random() * (badge.colorRange[5] - badge.colorRange[1])) + badge.colorRange[1];
			var b = Math.floor(Math.random() * (badge.colorRange[6] - badge.colorRange[2])) + badge.colorRange[2];
			var alpha = Math.floor(Math.random() * (badge.colorRange[7] - badge.colorRange[3])) + badge.colorRange[3];
			alpha = alpha/255.0;
			badge.trianglesTarget.push([x1,y1,x2,y2, r,g,b,alpha]);
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
				
				var r = (badge.trianglesTarget[i][4] - badge.triangles[i][4]) / (badge.steps - badge.step);
				r = delta * r + badge.triangles[i][4];
				var g = (badge.trianglesTarget[i][5] - badge.triangles[i][5]) / (badge.steps - badge.step);
				g = delta * g + badge.triangles[i][5];
				var b = (badge.trianglesTarget[i][6] - badge.triangles[i][6]) / (badge.steps - badge.step);
				b = delta * b + badge.triangles[i][6];
				var alpha = (badge.trianglesTarget[i][7] - badge.triangles[i][7]) / (badge.steps - badge.step);
				alpha = delta * alpha + badge.triangles[i][7];

				badge.triangles[i][0] = x1;
				badge.triangles[i][1] = y1;
				badge.triangles[i][2] = x2;
				badge.triangles[i][3] = y2;
				
				badge.triangles[i][4] = Math.floor(r);
				badge.triangles[i][5] = Math.floor(g);
				badge.triangles[i][6] = Math.floor(b);
				badge.triangles[i][7] = alpha;
			}
		} else {
			if (badge.step >= badge.steps * 2) {
				badge.step = 0;
				badge.createTarget();
			}
		}
	},
	createSVG: function(){
		var svg = '<svg viewBox="0 0 200 200" id="logo-svg">';
		
		var s = "";
		for (var i in badge.triangles) {
			var t = badge.triangles[i];
			s += '<path d="M100 100L' + t[0] + ' ' + t[1] + 'L' + t[2] + ' ' + t[3] + 'Z" style="fill:rgba(';
			s += t[4] + "," + t[5] + "," + t[6] + "," + t[7] + ');" />';
		}

		svg += s
		svg += '</svg>';
		$('.hero-logo').html(svg);
	},
	draw: function() {
		var paths = $("#logo-svg").children();
		for (var i in badge.triangles) {
			var t = badge.triangles[i];
			paths.eq(i).attr('d', 'M100 100L' + t[0] + ' ' + t[1] + 'L' + t[2] + ' ' + t[3] + 'Z');
			paths.eq(i).attr('style', 'fill:rgba(' + t[4] + "," + t[5] + "," + t[6] + "," + t[7] + ');');
		}
	},
	update: function() {
		badge.interpolate(0.1);
		badge.draw();

		requestAnimationFrame(badge.update);
	},
	
	calculate: function(text){
		badge.triangles = [];
		badge.angle = (2*Math.PI)/badge.axisCount;

		text = btoa(text).toLocaleUpperCase();
		for (var i=0; i<text.length; i++){
			var t1 = badge.letterCode(text, i);
			var t2 = i+1 < text.length ? badge.letterCode(text, i+1) : badge.letterCode(text, i+1 - text.length);
			var t3 = i+2 < text.length ? badge.letterCode(text, i+2) : badge.letterCode(text, i+2 - text.length);
			var t4 = i+3 < text.length ? badge.letterCode(text, i+3) : badge.letterCode(text, i+3 - text.length);

			var t5 = badge.letterCode(text, text.length - (i + 1));
			var t6 = i+1 < text.length ? badge.letterCode(text, text.length - (i + 2)) : badge.letterCode(text, (2 * text.length) - (i + 2));
			var t7 = i+2 < text.length ? badge.letterCode(text, text.length - (i + 3)) : badge.letterCode(text, (2 * text.length) - (i + 3));
			var t8 = i+3 < text.length ? badge.letterCode(text, text.length - (i + 4)) : badge.letterCode(text, (2 * text.length) - (i + 4));

			t1 /= 41.0;
			t2 = 1 - (t2/41);
			t3 /= 41.0;
			t4 = 1 - (t4/41.0);
			t5 = 1 - (t5/41.0);
			t6 /= 41.0;
			t7 /= 41.0;
			t8 = 1 - (t8/41.0);
			console.log(t1, t2, t3, t4, t5, t6, t7, t8);

			var a1 = Math.floor(t1 * badge.axisCount);
			var a2 = Math.floor(t2 * badge.axisCount);
			var v1 = t3 * 80 + 20;
			var v2 = t4 * 80 + 20;

			var x1 = v1 * Math.cos(a1*badge.angle)+100;
			var y1 = v1 * Math.sin(a1*badge.angle)+100;
			var x2 = v2 * Math.cos(a2*badge.angle)+100;
			var y2 = v2 * Math.sin(a2*badge.angle)+100;

			var r = Math.floor(t5 * (badge.colorRange[4] - badge.colorRange[0])) + badge.colorRange[0];
			var g = Math.floor(t6 * (badge.colorRange[5] - badge.colorRange[1])) + badge.colorRange[1];
			var b = Math.floor(t7 * (badge.colorRange[6] - badge.colorRange[2])) + badge.colorRange[2];
			var alpha = Math.floor(t8 * (badge.colorRange[7] - badge.colorRange[3])) + badge.colorRange[3];
			alpha = alpha/255.0;
			badge.triangles.push([x1,y1,x2,y2, r,g,b,alpha]);
		}
		badge.createSVG();
	},
	letterCode: function(text, index){
		var code = text.charCodeAt(index);
		code -= 49;
		if (code < 0){
			code = 0;
		}
		if (code > 41){
			code = 41;
		}
		return code;
	}
};
