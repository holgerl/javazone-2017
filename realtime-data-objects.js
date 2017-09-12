"use strict";

window.HL = window.HL || {};
HL.realtimeDataObjects = HL.realtimeDataObjects || {};

HL.realtimeDataObjects.person = function() {
	var headGeometry = new THREE.SphereGeometry(0.75, 30, 20);
	var headMaterial = new THREE.MeshToonMaterial({color: 0xFFFFFF});
	var head = new THREE.Mesh(headGeometry, headMaterial);
	var headOriginalPosition = new THREE.Vector3(0, 2*0.65 + 0.5, 0);
	head.position.copy(headOriginalPosition);

	var bodyGeometry = new THREE.ConeGeometry(1, 2, 30);
	var bodyMaterial = new THREE.MeshToonMaterial({color: 0xFFFFFF});
	var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
	body.position.set(0, 0.5, 0);

	var person = new THREE.Object3D();
	person.add(head);
	person.add(body);

	person.deviance = Math.random();

	person.setHeadBob = function(amount) {
		head.position.setY(headOriginalPosition.y + amount);
	}

	person.updateHead = function(time) {
		var speed = 15;
		var sine = Math.sin(speed * time + this.deviance*2*Math.PI);
		this.setHeadBob(sine * 0.15);
	}

	return person;
}

HL.realtimeDataObjects.bandArrow = function(width, length) {
	var bandGeometry = new THREE.BoxGeometry(length, 0.01, width);
	var bandMaterial = new THREE.MeshToonMaterial({color: 0x888888});
	var band = new THREE.Mesh(bandGeometry, bandMaterial);

	var arrowGeometry = new THREE.BoxGeometry(width, 0.01, width*2);
	arrowGeometry.vertices[0].setZ(0);
	arrowGeometry.vertices[1].setZ(0);
	arrowGeometry.vertices[2].setZ(0);
	arrowGeometry.vertices[3].setZ(0);
	var arrowMaterial = new THREE.MeshToonMaterial({color: 0x888888});
	var arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
	arrow.position.set(length/2 + width/2, 0.01, 0);

	var bandArrow = new THREE.Object3D();
	bandArrow.add(band);
	bandArrow.add(arrow);

	return bandArrow;	
}

HL.realtimeDataObjects.laptop = function() {
	var frameGeometry = new THREE.BoxGeometry(1, 0.05, 0.6);
	var frameMaterial = new THREE.MeshToonMaterial({color: 0xFFFFFF});
	var frame = new THREE.Mesh(frameGeometry, frameMaterial);

	var lcdGeometry = new THREE.BoxGeometry(1*0.935, 0.05, 0.6*0.935);
	var lcdMaterial = new THREE.MeshToonMaterial({color: 0x888888});
	var lcd = new THREE.Mesh(lcdGeometry, lcdMaterial);
	lcd.position.set(0, 0.002, 0);

	var screen = new THREE.Object3D();
	screen.add(frame);
	screen.add(lcd);
	screen.position.set(0, 0.3, -0.42);
	screen.rotation.set(Math.PI/2*0.75, 0, 0);

	var baseGeometry = new THREE.BoxGeometry(1, 0.05, 0.6);
	var baseMaterial = new THREE.MeshToonMaterial({color: 0xFFFFFF});
	var base = new THREE.Mesh(baseGeometry, baseMaterial);

	var keyboard = new THREE.Object3D();
	var keyGeometry = new THREE.BoxGeometry(0.6/4*0.49, 0.05, 1/10*0.49);
	var keyMaterial = new THREE.MeshToonMaterial({color: 0x888888});
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 4; y++) {
			var key = new THREE.Mesh(keyGeometry, keyMaterial);
			key.position.set(x/11 - 0.4, 0.01, y/4*0.3 - 0.2);
			keyboard.add(key);
		}
	}

	var laptop = new THREE.Object3D();
	laptop.add(screen);
	laptop.add(base);
	laptop.add(keyboard);

	return laptop;
}

HL.realtimeDataObjects.server = function() {
	var frameGeometry = new THREE.BoxGeometry(0.65, 1.25, 1);
	var frameMaterial = new THREE.MeshToonMaterial({color: 0xDDDDDD});
	var frame = new THREE.Mesh(frameGeometry, frameMaterial);

	var frontGeometry = new THREE.BoxGeometry(0.65, 1.25, 0.075);
	var frontMaterial = new THREE.MeshToonMaterial({color: 0x666666});
	var front = new THREE.Mesh(frontGeometry, frontMaterial);
	front.position.set(0, 0, 1/2 + 0.075/2);

	var lights = new THREE.Object3D();
	var lightGeometry = new THREE.BoxGeometry(0.06, 0.06, 0.005);
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 4; y++) {
			var lightMaterial = new THREE.MeshToonMaterial({color: 0xDDDDDD});
			var light = new THREE.Mesh(lightGeometry, lightMaterial);
			light.position.set(
				0.65 * 0.5 + x/3 * 0.65 * 0.5 - 0.08, 
				1.25 * 0.5 + y/4 * 1.25 * 0.4 - 0.08, 
				1
			);
			lights.add(light);
		}
	}

	var server = new THREE.Object3D();
	server.add(frame);
	server.add(lights);
	server.add(front);

	var intensities = [0x88/0xFF, 0xCC/0xFF, 0xFF/0xFF];

	server.updateLights = function(time) {
		var speed = 0.1;
		if (time - server.lastLightUpdate < speed) return;
		server.lastLightUpdate = time;
		for (var i in lights.children) {
			var light = lights.children[i];
			var intensity = intensities[HL.util.randomInt(0, intensities.length - 1)];
			light.material.color.setRGB(intensity, intensity, intensity);
			light.material.needsUpdate = true;
		}
	}

	return server;
}

HL.realtimeDataObjects.mic = function() {
	var topGeometry = new THREE.IcosahedronGeometry(0.7, 1);
	var topMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, shading: THREE.FlatShading});
	var top = new THREE.Mesh(topGeometry, topMaterial);
	top.position.set(0, 1.6, 0);

	var rodGeometry = new THREE.CylinderGeometry(0.3, 0.2, 2.5);
	var rodMaterial = new THREE.MeshToonMaterial({color: 0xDDDDDD});
	var rod = new THREE.Mesh(rodGeometry, rodMaterial);

	var mic = new THREE.Object3D();
	mic.add(top);
	mic.add(rod);

	mic.rotation.set(0, 0, Math.PI * 0.33);

	return mic;
}

HL.realtimeDataObjects.personWithLaptop = function() {
	var person = HL.realtimeDataObjects.person();
	person.position.set(0, 0, 1.5);

	var laptop = HL.realtimeDataObjects.laptop();
	laptop.scale.set(4, 4, 4);
	laptop.position.set(1.5, 0, -1.5);

	var personWithLaptop = new THREE.Object3D();
	personWithLaptop.add(person);
	personWithLaptop.add(laptop);

	personWithLaptop.updateHead = function(time) {
		person.updateHead(time);
	}

	return personWithLaptop;
}

HL.realtimeDataObjects.personWithMic = function() {
	var person = HL.realtimeDataObjects.person();
	person.position.set(0, 0, 1.5);

	var mic = HL.realtimeDataObjects.mic();
	mic.position.set(2, 0, -1);

	var personWithMic = new THREE.Object3D();
	personWithMic.add(person);
	personWithMic.add(mic);

	personWithMic.updateHead = function(time) {
		person.updateHead(time);
	}

	return personWithMic;
}
