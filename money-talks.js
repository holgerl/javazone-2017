"use strict";

window.HL = window.HL || {};

HL.moneyTalks = {}

HL.step = 0;
HL.lastStep = 0;

HL.firstTimeStart = 0;

HL.moneyTalks.initOnce = function() {
	var center = new THREE.Vector3(0, -0.6, 0);
	var centerBottom = new THREE.Vector3(0, -1, 0);
	var centerBottomLower = new THREE.Vector3(0, -1.5, 0);
	var centerTop = new THREE.Vector3(0, 1.2, 0);

	makeText("Statsbudsjettet", "statsbudsjettet", "statsbudsjettstep0", center);
	makeText("i kjente st&oslash;rrelser", "ikjentestorrelser", "smaller statsbudsjettstep0", centerBottom);
	makeText("1 Tesla P100D", "entesla", "statsbudsjettstep1", centerBottomLower);
	makeText("1 103 225 Teslaer = 1 statsbudsjett", "millionteslaer", "statsbudsjettstep3", centerTop);
}

HL.moneyTalks.init = function() {
	//HL.camera.fov =90;
	//HL.camera.position.set(1.99, 0.3, 1.99);
	//HL.camera.lookAt(new THREE.Vector3(1.9, 0.28, 1.9));

	HL.camera.fov = 60;
	HL.camera.position.copy(HL.moneyTalks.steps[0].cameraPosition);
	HL.camera.lookAt(HL.moneyTalks.steps[0].cameraLookat);

	HL.camera.updateProjectionMatrix();

	var geometry = HL.moneyTalks.makeGeometry();
	HL.geometry = geometry;

	var uniforms = {
		time: {value: 0.0},
		firstTime: {value: -1.0},
		releaseTime: {value: 0.0},
		releaseSlowdown: {value: HL.moneyTalks.steps[0].releaseSlowdown},
		delayReducer: {value: 0.0}
	};
	window.uniforms = uniforms;
	
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('moneyTalksVertexShader').textContent,
		fragmentShader: document.getElementById('moneyTalksFragmentShader').textContent,
		depthWrite: false
	});

	var points = new THREE.Points(geometry, material);
	HL.scene.add(points);
}

HL.moneyTalks.makeGeometry = function() {
	var geometry = new THREE.BufferGeometry();

	var nofParticles = 1.1032e6; // Statsbudsjett / Tesla P100D = 1301806000000 / 1180000 = 1.1032e6

	var square = Math.floor(Math.sqrt(nofParticles));
	var nofParticles2D = new THREE.Vector2(square, square);
	var dimensions = new THREE.Vector2(5, 5);

	var positions = new Float32Array(nofParticles * 3);
	var deviance = new Float32Array(nofParticles);
	var deviance2 = new Float32Array(nofParticles);

	for (var i = 0; i < nofParticles; i++) {
		var x = i % nofParticles2D.x;
		var y = Math.floor(i / nofParticles2D.x);

		//var position = HL.util.randomPointInsideCircle(new THREE.Vector2(0.0, 0.0), dimensions.x/2);
		//positions[i*3 + 0] = position.x;
		//positions[i*3 + 1] = 0.0;
		//positions[i*3 + 2] = position.y;

		//positions[i*3 + 0] = -dimensions.x/2 + x / nofParticles2D.x * dimensions.x;
		//positions[i*3 + 1] = 0.0;
		//positions[i*3 + 2] = -dimensions.y/2 + y / nofParticles2D.y * dimensions.y;

		positions[i*3 + 0] = (-dimensions.x/2 + x / nofParticles2D.x * dimensions.x) * (1.0 - y / nofParticles2D.y / 1.75);
		positions[i*3 + 1] = 0.0;
		positions[i*3 + 2] = -dimensions.y/2 + y / nofParticles2D.y * dimensions.y;

		deviance[i] = HL.util.randomFloat(0, 1);
		deviance2[i] = HL.util.randomFloat(0, 1);

		if (y == nofParticles2D.y-1 && x == Math.floor(nofParticles2D.x/2)) deviance[i] = 0; // The first particle
	}

	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.addAttribute('deviance', new THREE.BufferAttribute(deviance, 1));
	geometry.addAttribute('deviance2', new THREE.BufferAttribute(deviance2, 1));

	geometry.computeBoundingSphere();

	return geometry;
}

HL.moneyTalks.animate = function() {
	var speed = 1.0;

	if (HL.step >= 1 && HL.step <= 2) {
		window.uniforms.firstTime.value = (new Date().getTime() - HL.firstTimeStart) / 1000 * speed;
	}

	if (HL.step == 2) {
		window.uniforms.time.value = (new Date().getTime() - HL.timeStart) / 1000 * speed;
		window.uniforms.releaseTime.value = window.uniforms.time.value * 100;
	}

	if (window.uniforms.releaseSlowdown.value > window.releaseSlowdownTarget) {
		window.uniforms.releaseSlowdown.value -= window.releaseDiff/100;
	}

	var stepTimeDiff = HL.util.clamp(HL.stepTimeDiff, 0, 1);

	var lastCameraPosition = HL.moneyTalks.steps[HL.lastStep].cameraPosition;
	var currentCameraPosition = HL.moneyTalks.steps[HL.step].cameraPosition;

	var lastCameraLookat = HL.moneyTalks.steps[HL.lastStep].cameraLookat;
	var currentCameraLookat = HL.moneyTalks.steps[HL.step].cameraLookat;

	HL.camera.position.lerpVectors(lastCameraPosition, currentCameraPosition, stepTimeDiff);
	HL.camera.lookAt(lastCameraLookat.clone().lerp(currentCameraLookat, stepTimeDiff));
}

HL.moneyTalks.cleanup = function() {

}

HL.moneyTalks.steps = {
	0: {
		releaseSlowdown: 100000,
		delayReducer: 0.0,
		cameraPosition: new THREE.Vector3(0, 0.05, 2.6),
		cameraLookat: new THREE.Vector3(0, -0.1, 2)
	},
	1: {
		releaseSlowdown: 10000,
		delayReducer: 0.2,
		cameraPosition: new THREE.Vector3(0, 0.05, 2.6),
		cameraLookat: new THREE.Vector3(0, -0.1, 2)
	},
	2: {
		releaseSlowdown: 1000,
		delayReducer: 0.4,
		cameraPosition: new THREE.Vector3(0, 0.5, 3.5),
		cameraLookat: new THREE.Vector3(0, 0.5, 2)
	},
	3: {
		releaseSlowdown: 100,
		delayReducer: 0.6,
		cameraPosition: new THREE.Vector3(0, 0.5, 3.5),
		cameraLookat: new THREE.Vector3(0, 0.5, 2)
	}/*,
	4: {
		releaseSlowdown: 10,
		delayReducer: 0.8,
		cameraPosition: new THREE.Vector3(-0.5, 0.05, 0.5),
		cameraLookat: new THREE.Vector3(0, 0, 0)
	},
	5: {
		releaseSlowdown: 0,
		delayReducer: 1.0,
		cameraPosition: new THREE.Vector3(0, 0.5, 3.5),
		cameraLookat: new THREE.Vector3(0, 0.5, 2)
	}*/
}

HL.moneyTalks.maxStep = Object.keys(HL.moneyTalks.steps).length;

HL.moneyTalks.doStep = function() {
	var step = HL.moneyTalks.steps[HL.step];
	window.releaseSlowdownTarget = step.releaseSlowdown;
	window.releaseDiff = window.uniforms.releaseSlowdown.value - window.releaseSlowdownTarget;
	window.uniforms.delayReducer.value = step.delayReducer;

	HL.timeStart = new Date().getTime();

	if (HL.step == 1) HL.firstTimeStart = new Date().getTime();

	HL.stepStart = new Date().getTime();

	HL.util.addAndRemoveClass("span", '.statsbudsjettstep' + HL.step, "hidden");
}
