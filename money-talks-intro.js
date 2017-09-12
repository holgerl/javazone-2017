"use strict";

window.HL = window.HL || {};

HL.moneyTalksIntro = HL.moneyTalksIntro || {}

HL.step = 0;

HL.moneyTalksIntro.stepSize = 10;

HL.moneyTalksIntro.initOnce = function() {
	makeText("Bazillionaire", null, "big moneyTalksIntro", new THREE.Vector3(0, 0, 0));
	makeText("Statsbudsjettet", null, "big moneyTalksIntro", new THREE.Vector3(HL.moneyTalksIntro.stepSize, 0, 0));
}

HL.moneyTalksIntro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	makeImage("/img/siv.jpg", new THREE.Vector3(9/4, 6/4, 0.1), new THREE.Vector3(HL.moneyTalksIntro.stepSize*2 - 1.5, 0, 0));
	makeImage("/img/statsbudsjettet.png", new THREE.Vector3(8.59/3, 8.85/3, 0.1), new THREE.Vector3(HL.moneyTalksIntro.stepSize*2 + 1.5, 0, 0));

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}


HL.moneyTalksIntro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.moneyTalksIntro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.moneyTalksIntro.cleanup = function() {

}

HL.moneyTalksIntro.steps = {
	0: {
		cameraDistance: 0,
		cameraAcceleration: 0
	},
}

HL.moneyTalksIntro.maxStep = 2;

HL.moneyTalksIntro.doStep = function() {
	HL.util.addAndRemoveClass("span", '.moneyTalksIntro', "hidden");
}
