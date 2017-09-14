"use strict";

window.HL = window.HL || {};
HL.howWebGLWorks = HL.howWebGLWorks || {}

HL.step = 0;
HL.howWebGLWorks.maxStep = 8;
HL.howWebGLWorks.stepSize = 10;
HL.howWebGLWorks.stepSpeed = 1/10;

HL.howWebGLWorks.initOnce = function() {
	makeText("Hvordan funker", null, "big howWebGLWorks", new THREE.Vector3(0, 0.25, 0));
	makeText("WebGL", null, "bigger howWebGLWorks", new THREE.Vector3(0, -0.25, 0));

	makeText("Gir et canvas-element<br/>til WebGL", null, "bigish howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize + 1, 0, 0));

	makeText("Spesifiser", null, "big howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*2, 0.5, 0));
	makeText("punkter (vertices)<br/>polygoner (faces)<br/>fargeleggingskode (shaders)", null, "howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*2 - 0.5, -0.5, 0));
	makeText("= mesh", null, "big howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*2 + 1.1, -0.4, 0));

	makeText("Spesifiser", null, "big howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*3 - 1.1, 0.15, 0));
	makeText("for hvert mesh", null, "bigish howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*3 - 1.1, -0.15, 0));
	makeText("plassering<br/>rotasjon<br/>osv", null, "bigish howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*3 + 1.1, 0, 0));

	makeText("loop", null, "big howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*4 - 0.65, 0.2, 0));
	makeText("tegn bildet (render)<br/>oppdater evt. meshene", null, "howWebGLWorks", new THREE.Vector3(HL.howWebGLWorks.stepSize*4 + 0.2, -0.2, 0));
}

HL.howWebGLWorks.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	makeImage("img/canvas-on-page.png", new THREE.Vector3(4.4/3, 5.2/3, 0.01), new THREE.Vector3(HL.howWebGLWorks.stepSize - 1.5, 0, 0));

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}

HL.howWebGLWorks.animate = function() {
	var cameraDiff = HL.step * HL.howWebGLWorks.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * HL.howWebGLWorks.stepSpeed;
}

HL.howWebGLWorks.cleanup = function() {

}

HL.howWebGLWorks.doStep = function() {
	HL.util.addAndRemoveClass("span", ".howWebGLWorks", "hidden");
}
