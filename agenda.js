"use strict";

window.HL = window.HL || {};
HL.agenda = HL.agenda || {}

HL.step = 0;
HL.agenda.maxStep = 1;
HL.agenda.stepSize = 10;

HL.agenda.initOnce = function() {
	makeText("Agenda", null, "bigger agenda", new THREE.Vector3(0, 1, 0));
	makeText("(Intro)", null, "bigish agenda", new THREE.Vector3(0, 0.25, 0));
	makeText("Demo", null, "bigish agenda", new THREE.Vector3(0, 0, 0));
	makeText("Masse demo", null, "bigish agenda", new THREE.Vector3(0, -0.25, 0));
	makeText("How it works", null, "bigish agenda", new THREE.Vector3(0, -0.50, 0));
	makeText("Sanntidvisualisering", null, "bigish agenda", new THREE.Vector3(0, -0.75, 0));

	makeText("&#x1F3AC; DEMO &#x1F3AC;", null, "bigger agenda", new THREE.Vector3(HL.agenda.stepSize, 0, 0));
}

HL.agenda.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();
}

HL.agenda.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.agenda.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;
}

HL.agenda.cleanup = function() {

}

HL.agenda.doStep = function() {
	HL.util.addAndRemoveClass("span", ".agenda", "hidden");
}
