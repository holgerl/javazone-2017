"use strict";

window.HL = window.HL || {};

HL.outro = HL.outro || {}

HL.step = 0;

HL.outro.stepSize = 10;

HL.outro.initOnce = function() {
	makeText("Visualisation de données", null, "big outro", new THREE.Vector3(0, 0.5, 0));
	makeText("WebGL", null, "bigger outro", new THREE.Vector3(0, 0, 0));
	makeText("Fantastique", null, "big outro", new THREE.Vector3(0, -0.5, 0));

	makeText("Sp&oslash;rsm&aring;l?", null, "big outro", new THREE.Vector3(HL.outro.stepSize, 0.25, 0));
	makeText("@holgerludvigsen", null, "outro", new THREE.Vector3(HL.outro.stepSize, -0.25, 0));
	
	makeText("Takk for meg!", null, "bigger outro", new THREE.Vector3(HL.outro.stepSize*2, 0.25, 0));
	makeText("@holgerludvigsen", null, "outro", new THREE.Vector3(HL.outro.stepSize*2, -0.25, 0));
}

HL.outro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	var light = new THREE.DirectionalLight();
	light.position.set(3, 10, 8);
	HL.scene.add(light);
}

HL.outro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.outro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.outro.cleanup = function() {

}

HL.outro.maxStep = 3;

HL.outro.doStep = function() {
	HL.util.addAndRemoveClass("span", '.outro', "hidden");
}
