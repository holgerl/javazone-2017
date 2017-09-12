"use strict";

window.HL = window.HL || {};

HL.correlationsIntro = HL.correlationsIntro || {}

HL.step = 0;
HL.correlationsIntro.maxStep = 2;

HL.correlationsIntro.stepSize = 10;

HL.correlationsIntro.initOnce = function() {
	makeText("Sammenhenger", null, "big correlationsIntro", new THREE.Vector3(0, 0.0, 0));

	makeText("Stack Overflow", null, "big correlationsIntro", new THREE.Vector3(HL.correlationsIntro.stepSize, 1, 0));
	
	makeText("Google BigQuery", null, "big correlationsIntro", new THREE.Vector3(HL.correlationsIntro.stepSize*2, 0.25, 0));
	makeText("cloud.google.com/bigquery/public-data/stackoverflow", null, "smaller correlationsIntro", new THREE.Vector3(HL.correlationsIntro.stepSize*2, -0.25, 0));
}

HL.correlationsIntro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	makeImage("img/stackoverflow.png", new THREE.Vector3(12.76/4, 7.16/4, 0.1), new THREE.Vector3(HL.correlationsIntro.stepSize, -0.25, 0));

	var light = new THREE.DirectionalLight();
	light.position.set(3, 3, 8);
	HL.scene.add(light);
}


HL.correlationsIntro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.correlationsIntro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.correlationsIntro.cleanup = function() {

}


HL.correlationsIntro.doStep = function() {
	HL.util.addAndRemoveClass("span", ".correlationsIntro", "hidden");
}
