"use strict";

window.HL = window.HL || {};

HL.buzzwords = HL.buzzwords || {}

HL.step = 0;

var buzzWordTextElements = {};

HL.buzzwords.initOnce = function() {
	HL.buzzwords.words = [];

	for (var key in HL.buzzwords.indecies) {
		var index = HL.buzzwords.indecies[key];
		var node = document.createElement("span");
		var textnode = document.createTextNode(key);
		node.setAttribute("id", "buzzword" + index);
		node.setAttribute("class", "buzzword");
		node.appendChild(textnode);
		document.getElementsByTagName("body")[0].appendChild(node);
		HL.buzzwords.words.push(node);
		buzzWordTextElements[index] = node;
	}


	function makeTextNode(str) {
		var node = document.createElement("span");
		var textnode = document.createTextNode(str);
		node.setAttribute("id", "year"+str);
		node.setAttribute("class", "big year");
		node.appendChild(textnode);
		document.getElementsByTagName("body")[0].appendChild(node);
	}

	makeTextNode("2008");
	makeTextNode("2009");
	makeTextNode("2010");
	makeTextNode("2011");
	makeTextNode("2012");
	makeTextNode("2013");
	makeTextNode("2014");
	makeTextNode("2015");
	makeTextNode("2016");
	makeTextNode("2017");
}

HL.buzzwords.init = function() {
	HL.camera.position.set(3.5, 3, 5);
	HL.camera.lookAt(new THREE.Vector3(-1, -0.5, -1));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	var nofBuzzwords = coolWords.length;

	var dimension = Math.sqrt(nofBuzzwords);
	var spread = 1;

	HL.startTime = new Date().getTime();

	HL.buzzwords.columns = [];

	for (var i = 0; i < nofBuzzwords; i++) {
		var x = -dimension/2 + Math.floor(i / dimension);
		var y = -dimension/2 + i % dimension;

		var column = makeColumn();
		column.hype = 0.0;

		column.position.set(x*spread, 0, y*spread);

		HL.buzzwords.columns.push(column);

		HL.scene.add(column);
	}

	var light = new THREE.DirectionalLight(0xFFFFFF, 1);
	light.position.set(-1, 2, 1);
	HL.scene.add(light);

	var light2 = new THREE.DirectionalLight(0xFFFFFF, 0.04);
	light2.position.set(2, 2, -1);
	HL.scene.add(light2);

	var light3 = new THREE.DirectionalLight(0xFFFFFF, 0.04);
	light3.position.set(1, 2, -2);
	HL.scene.add(light3);
}

var makeColumn = function() {
	var geometry = new THREE.SphereGeometry(0.2, 100, 50);
	HL.geometry = geometry;
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, opacity: 0.5, transparent: true});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

HL.buzzwords.red = new THREE.Color(1, 0.5, 0.5);
HL.buzzwords.green = new THREE.Color(0.5, 1, 0.5);

var buzzRed = new THREE.Color(1, 0.3, 0.3);
var buzzGreen = new THREE.Color(0.1, 1, 0.1);

HL.buzzwords.animate = function() {
	var year = 2008 + HL.step;
	var hype = HL.buzzwords.hype[year];
	var lastYearHypes = HL.buzzwords.hype[year-1] || {};
	var adjustmentSpeed = 1/300; // 1/300;

	for (var key in HL.buzzwords.indecies) {
		var i = HL.buzzwords.indecies[key];
		
		var currentHype = hype[key];
		var lastYearHype = lastYearHypes[key] || 0;
		if (currentHype == undefined) currentHype = 0;

		currentHype = HL.util.clamp(currentHype*10, 0, 1);
		if (currentHype < 0.3) currentHype = 0;

		var column = HL.buzzwords.columns[i];
		var heightDiff = column.hype - currentHype;
		column.hype -= heightDiff * adjustmentSpeed;
		column.position.y = column.hype;

		var scale = column.hype * 2;
		scale = Math.max(scale, 0.001);
		column.scale.set(scale, scale, scale);

		//column.material.color = currentHype - lastYearHype < 0 ? HL.buzzwords.red : HL.buzzwords.green;
		let hypeRelative = Math.max((currentHype - lastYearHype)*currentHype, 0);
		//let hypeRelative = (currentHype/lastYearHype - 0.5) / 10;
		column.material.color = buzzRed.clone().lerp(buzzGreen, hypeRelative)
		column.material.needsUpdate = true;

		var labelPosition = column.position.clone();
		//labelPosition.y += 0.2;
		var element = buzzWordTextElements[i];
		HL.util.setHTMLElementPosition(element, labelPosition, HL.camera);
		var fontSizeFactor = 40;
		var fontSize = column.hype * fontSizeFactor;
		element.style["font-size"] = fontSize.toFixed(2) + "px";
	}

	document.querySelectorAll(".year").forEach(function(element) {
		var top = HL.step * 10;
		var elementYear = parseInt(element.innerText);
		var diffYear = elementYear - year;
		var target = 10 + 100 * diffYear;
		var leftNow = parseFloat(element.style.left.split("%")[0]);
		if (element.style.left == "") leftNow = 100;
		var diffTarget = target - leftNow;
		var speed = 0.075;
		var newLeft = leftNow + diffTarget*speed;

		if (newLeft < 0 || newLeft > 100) element.style.display = "none";
		else element.style.display = "inherit";

		element.style.left = newLeft + "%";
	});

	var time = (new Date().getTime() - HL.startTime) / 1000;
	var rotSpeed = 0.1; // 0.05;
	var radius = 10;

	HL.camera.position.set(radius*Math.sin(time*rotSpeed), 5, radius*Math.cos(time*rotSpeed)); // HL.camera.position.set(3.5, 3, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0.25, 0));
}

HL.buzzwords.cleanup = function() {
	document.querySelectorAll(".year").forEach(function(element) {
		element.style.display = "none";
	});
}

HL.buzzwords.maxStep = 2017-2008;

HL.buzzwords.doStep = function() {
	HL.animationStart = new Date().getTime();

	document.querySelectorAll('.buzzword').forEach(function(element) {
		element.classList.remove('hidden');
	});
}
