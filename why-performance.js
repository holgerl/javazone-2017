"use strict";

window.HL = window.HL || {};
HL.whyPerformance = HL.whyPerformance || {}

HL.step = 0;
HL.whyPerformance.maxStep = 6;
HL.whyPerformance.stepSize = 10;
HL.whyPerformance.stepSpeed = 1/10;

HL.whyPerformance.initOnce = function() {
	makeText("Hvorfor er", null, "big whyPerformance", new THREE.Vector3(0, 0.45, 0));
	makeText("ytelsen", null, "bigger whyPerformance", new THREE.Vector3(0, 0, 0));
	makeText("så god?", null, "bigger whyPerformance", new THREE.Vector3(0, -0.5, 0));

	makeText("API tilpasset hardware", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize, -1, 0));
	makeText("Rekkefølge og oppdeling", null, "bigish whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize, -1.35, 0));

	makeText("Hvor mye raskere", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 - 1.5, 0.2, 0));
	makeText("kan GPU være?", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 - 1.5, -0.2, 0));
	makeText("CPU", null, "bigger whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, 1.1, 0));
	makeText("(Intel i7-990X)", null, "smaller whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, 0.7, 0));
	makeText("8 kjerner", null, "whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, 0.45, 0));
	makeText("3.6 GHz", null, "whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, 0.3, 0));
	makeText("GPU", null, "bigger whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, -0.5, 0));
	makeText("(nVidia Geforce GTX 1080 Ti)", null, "smaller whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, -0.9, 0));
	makeText("3584 kjerner", null, "whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, -1.15, 0));
	makeText("1.48 GHz", null, "whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*2 + 1.35, -1.3, 0));

	makeText("3584 &times; 1.48", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*3 - 0.8, 0.25, 0));
	makeText("&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*3 - 0.8, 0, 0));
	makeText("8 &times; 3.6", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*3 - 0.8, -0.25, 0));
	makeText("= 184 x", null, "bigger whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*3 + 0.8, 0, 0));

	makeText("&quot;Kænn 'n itte berre", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*4, 0.2, 0));
	makeText("bruke kenves æpi 'a?&quot;", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*4, -0.2, 0));
	
	makeText("Canvas API", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*5, 1.4, 0));

	makeText("WebGL", null, "big whyPerformance", new THREE.Vector3(HL.whyPerformance.stepSize*6, 1.4, 0));
}

HL.whyPerformance.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	makeImage("img/cpu-vs-gpu.png", new THREE.Vector3(9.6/3, 5.4/3, 0.1), new THREE.Vector3(HL.whyPerformance.stepSize, 0.25, 0));

	makeImage("img/trehjul.jpg", new THREE.Vector3(5.6/2, 5.25/2, 0.1), new THREE.Vector3(HL.whyPerformance.stepSize*5, -0.2, 0));

	makeImage("img/ninja.jpg", new THREE.Vector3(6.56/2, 4.92/2, 0.1), new THREE.Vector3(HL.whyPerformance.stepSize*6, -0.2, 0));

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}

HL.whyPerformance.animate = function() {
	var cameraDiff = HL.step * HL.whyPerformance.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * HL.whyPerformance.stepSpeed;
}

HL.whyPerformance.cleanup = function() {

}

HL.whyPerformance.doStep = function() {
	HL.util.addAndRemoveClass("span", ".whyPerformance", "hidden");
}
