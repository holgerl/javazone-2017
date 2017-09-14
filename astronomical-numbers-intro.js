"use strict";

window.HL = window.HL || {};

HL.astronomicalNumbersIntro = HL.astronomicalNumbersIntro || {}

HL.step = 0;

HL.astronomicalNumbersIntro.stepSize = 10;

HL.astronomicalNumbersIntro.initOnce = function() {
	makeText("Astronomiske", null, "big astronomicalNumbersIntro", new THREE.Vector3(0, 0.25, 0));
	makeText("st&oslash;rrelser", null, "big astronomicalNumbersIntro", new THREE.Vector3(0, -0.25, 0));

	makeText("Store tall", null, "big astronomicalNumbersIntro", new THREE.Vector3(HL.astronomicalNumbersIntro.stepSize - 1, 0, 0));

	makeText("Store ting", null, "big astronomicalNumbersIntro", new THREE.Vector3(HL.astronomicalNumbersIntro.stepSize*2 - 1.75, 0, 0));
}

HL.astronomicalNumbersIntro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	makeImage("img/moondata.png", new THREE.Vector3(0.65*2, 1.4*2, 0.1), new THREE.Vector3(HL.astronomicalNumbersIntro.stepSize + 1, 0, 0));
	makeImage("img/happy-planets.jpg", new THREE.Vector3(12.8/4, 7.2/4, 0.1), new THREE.Vector3(HL.astronomicalNumbersIntro.stepSize*2 + 1, 0, 0));

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}


HL.astronomicalNumbersIntro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.astronomicalNumbersIntro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.astronomicalNumbersIntro.cleanup = function() {

}

HL.astronomicalNumbersIntro.maxStep = 2;

HL.astronomicalNumbersIntro.doStep = function() {
	HL.util.addAndRemoveClass("span", ".astronomicalNumbersIntro", "hidden");
}
