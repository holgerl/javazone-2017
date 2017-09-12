"use strict";

window.HL = window.HL || {};
HL.realtimeData = HL.realtimeData || {}

HL.step = 0;
HL.realtimeData.maxStep = 8;
HL.realtimeData.stepSize = 10;
HL.realtimeData.stepSpeed = 1/10;

HL.realtimeData.initOnce = function() {
	makeText("Sanntidsdata", null, "big realtimeDataStep0", new THREE.Vector3(0, 0, 0));

	makeText("Websocket", null, "realtimeDataStep2", new THREE.Vector3(10, 0, -12 + 3 - 6));
	makeText("Websocket", null, "realtimeDataStep2", new THREE.Vector3(10, 1, 0 + 3 - 3));
	makeText("Websocket", null, "realtimeDataStep2", new THREE.Vector3(10, 1.5, 12 + 3 - 1));
}

HL.realtimeData.init = function() {
	HL.camera.position.set(200, 200, 200);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 5;
	HL.camera.updateProjectionMatrix();

	// Step 1

	var bandArrow = HL.realtimeDataObjects.bandArrow(1, 4);
	bandArrow.position.set(3, 0, 0);
	HL.scene.add(bandArrow);

	var laptop1 = HL.realtimeDataObjects.laptop();
	laptop1.position.set(14, 0, 1);
	laptop1.scale.set(6, 6, 6);
	HL.scene.add(laptop1);

	// Step 2

	var person1 = HL.realtimeDataObjects.personWithMic();
	person1.position.set(-12, 0, -15 + 4);
	HL.scene.add(person1);

	var person2 = HL.realtimeDataObjects.personWithLaptop();
	person2.position.set(-12, 0, 0 + 4);
	HL.scene.add(person2);

	var person3 = HL.realtimeDataObjects.personWithLaptop();
	person3.position.set(-12, 0, 15 + 4);
	HL.scene.add(person3);

	var bandArrow1 = HL.realtimeDataObjects.bandArrow(1, 4);
	bandArrow1.position.set(-5, 0, -15 + 3);
	HL.scene.add(bandArrow1);
	var bandArrow2 = HL.realtimeDataObjects.bandArrow(1, 4);
	bandArrow2.position.set(-5, 0, 0 + 3);
	HL.scene.add(bandArrow2);
	var bandArrow3 = HL.realtimeDataObjects.bandArrow(1, 4);
	bandArrow3.position.set(-5, 0, 15 + 3);
	HL.scene.add(bandArrow3);

	var server1 = HL.realtimeDataObjects.server();
	server1.scale.set(4, 4, 4);
	server1.position.set(2, 0, 15);
	HL.scene.add(server1);

	var server2 = HL.realtimeDataObjects.server();
	server2.scale.set(4, 4, 4);
	server2.position.set(2, 0, 0);
	HL.scene.add(server2);

	var server3 = HL.realtimeDataObjects.server();
	server3.scale.set(4, 4, 4);
	server3.position.set(2, 0, -15);
	HL.scene.add(server3);

	var bandArrow4 = HL.realtimeDataObjects.bandArrow(1, 6);
	bandArrow4.position.set(10, 0, -12 + 3);
	bandArrow4.rotation.set(0, -Math.PI/4, 0);
	HL.scene.add(bandArrow4);
	var bandArrow5 = HL.realtimeDataObjects.bandArrow(1, 6);
	bandArrow5.position.set(10, 0, 0 + 3);
	HL.scene.add(bandArrow5);
	var bandArrow6 = HL.realtimeDataObjects.bandArrow(1, 6);
	bandArrow6.position.set(10, 0, 12 + 3);
	bandArrow6.rotation.set(0, Math.PI/4, 0);
	HL.scene.add(bandArrow6);

	var laptop2 = HL.realtimeDataObjects.laptop();
	laptop2.position.set(20, 0, 3);
	laptop2.scale.set(6, 6, 6);
	HL.scene.add(laptop2);

	// --

	HL.realtimeData.stepObjects = {
		0: [],
		1: [bandArrow, laptop1],
		2: [server1, server2, server3, laptop2, person1, person2, person3, bandArrow1, bandArrow2, bandArrow3, bandArrow4, bandArrow5, bandArrow6]
	}

	HL.realtimeData.persons = [person1, person2, person3];
	HL.realtimeData.servers = [server1, server2, server3];

	// Persons in step 1:

	for (var i = 0; i < 3*3; i++) {
		var person = HL.realtimeDataObjects.person();

		var y = Math.floor(i / 3);
		var random2D = new THREE.Vector2(i % 3, y);
		random2D.add(new THREE.Vector2((y % 2) * 0.5, 0));
		random2D.add(new THREE.Vector2(Math.random()*0.65, Math.random()*0.65));
		random2D.multiplyScalar(5).addScalar(-2.5*5/2);
		random2D.multiply(new THREE.Vector2(1, 1.5)); // Drag it out in y direction for estetics when camera is angled
		
		person.position.set(random2D.x - 13, 0, random2D.y);

		HL.scene.add(person);
		HL.realtimeData.persons.push(person);
		HL.realtimeData.stepObjects[1].push(person);
	}

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}

HL.realtimeData.animate = function() {
	//var cameraDiff = HL.step * HL.realtimeData.stepSize - HL.camera.position.x;
	//HL.camera.position.x += cameraDiff * HL.realtimeData.stepSpeed;
	
	var time = (new Date().getTime() - HL.timeStart) / 1000;

	for (var person of HL.realtimeData.persons) {
		person.updateHead(time)
	}

	for (var server of HL.realtimeData.servers) {
		server.updateLights(time)
	}
}

HL.realtimeData.cleanup = function() {

}

HL.realtimeData.doStep = function() {
	HL.util.addAndRemoveClass("span", ".realtimeDataStep" + HL.step, "hidden");

	for (var i in HL.realtimeData.stepObjects) {
		var step = HL.realtimeData.stepObjects[i];
		for (var object of step) {
			object.visible = false;
		}
	}

	for (var object of HL.realtimeData.stepObjects[HL.step]) {
		object.visible = true;
	}
}
