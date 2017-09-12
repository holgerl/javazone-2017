"use strict";

window.HL = window.HL || {};

HL.buzzwordsIntro = HL.buzzwordsIntro || {}

HL.step = 0;

HL.buzzwordsIntro.stepSize = 10;

HL.buzzwordsIntro.initOnce = function() {
	makeText("Utvikling", null, "big buzzwordsIntro", new THREE.Vector3(0, 0.25, 0));
	makeText("over tid", null, "buzzwordsIntro", new THREE.Vector3(0, -0.25, 0));

	makeText("Foredrag p&aring; JavaZone", null, "big buzzwordsIntro", new THREE.Vector3(HL.buzzwordsIntro.stepSize, 0.25, 0));
	makeText("sleepingpill.javazone.no/public/allSessions/javazone_2017", null, "buzzwordsIntro", new THREE.Vector3(HL.buzzwordsIntro.stepSize, -0.25, 0));

	makeText("1414 foredrag", null, "big buzzwordsIntro", new THREE.Vector3(HL.buzzwordsIntro.stepSize*2, 0.25, 0));
	makeText("de siste 10 &aring;r", null, "buzzwordsIntro", new THREE.Vector3(HL.buzzwordsIntro.stepSize*2, -0.25, 0));
}

HL.buzzwordsIntro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	var light = new THREE.DirectionalLight();
	light.position.set(3, 10, 8);
	HL.scene.add(light);
}


HL.buzzwordsIntro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.buzzwordsIntro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.buzzwordsIntro.cleanup = function() {

}

HL.buzzwordsIntro.steps = {
	0: { // Fridge
		cameraDistance: 0,
		cameraAcceleration: 0
	},
}

HL.buzzwordsIntro.maxStep = 2;

HL.buzzwordsIntro.doStep = function() {
	HL.util.addAndRemoveClass("span", ".buzzwordsIntro", "hidden");

}
