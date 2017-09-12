"use strict";

window.HL = window.HL || {};

HL.astronomicalNumbers = {}

HL.step = 0;

/*
Postgirobygget: 288 x 473   139 x 473   0.23678    =  68x112x33
*/

HL.astronomicalNumbers.init = function() {
	//HL.camera.position.set(2, 2, 5)
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 10;
	HL.camera.updateProjectionMatrix();

	var fridge = makeFridge();
	HL.scene.add(fridge);

	var postgirobygget = makePostGiroBygget();
	postgirobygget.position.set(0, 0, -25);
	HL.scene.add(postgirobygget);

	var oslo = makeOsloOmradet();
	oslo.position.set(0, 0, -60);
	HL.scene.add(oslo);

	var moon = makeMoon();
	moon.position.set(0, 0, -1740000*1.1);
	HL.scene.add(moon);

	var earth = makeEarth();
	earth.position.set(0, 0, -6371000*1.2);
	HL.scene.add(earth);

	var moonOrbit = makeMoonOrbit();
	//moonOrbit.position.set(0, 0, -385000000*1.1);
	HL.scene.add(moonOrbit);

	var sun = makeSun();
	sun.position.set(0, 0, -695700000*1.2);
	HL.scene.add(sun);

	var jupiterOrbit = makeJupiterOrbit();
	//jupiterOrbit.position.set(0, 0, -778500000000*1.1);
	HL.scene.add(jupiterOrbit);

	var solarSystem = makeSolarSystem();
	solarSystem.position.set(0, 0, -5906376272000*1.1);
	HL.scene.add(solarSystem);

	var light = new THREE.DirectionalLight();
	light.position.set(3, 10, 8);
	HL.scene.add(light);
}

var makeFridge = function() {
	var fridge = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(0.6, 1.85, 0.6);
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var base = new THREE.Mesh(geometry, material);
	fridge.add(base);

	var geometry = new THREE.BoxGeometry(0.58, 1, 0.6);
	var material = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
	var upperDoor = new THREE.Mesh(geometry, material);
	upperDoor.position.set(0, 0.415, 0.1);
	fridge.add(upperDoor);

	var geometry = new THREE.BoxGeometry(0.58, 0.8, 0.6);
	var material = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
	var lowerDoor = new THREE.Mesh(geometry, material);
	lowerDoor.position.set(0, -0.5, 0.1);
	fridge.add(lowerDoor);

	var geometry = new THREE.BoxGeometry(0.03, 0.2, 0.06);
	var material = new THREE.MeshLambertMaterial({color: 0x333333});
	var upperKnob = new THREE.Mesh(geometry, material);
	upperKnob.position.set(-0.2, 0.1, 0.6);
	fridge.add(upperKnob);
	var lowerKnob = new THREE.Mesh(geometry, material);
	lowerKnob.position.set(-0.2, -0.2, 0.6);
	fridge.add(lowerKnob);

	fridge.rotation.x += 0.2;
	fridge.rotation.y -= 0.2;

	return fridge;
}

var makePostGiroBygget = function() {
	var bygget = new THREE.Object3D();

	var material = new THREE.MeshLambertMaterial({color: 0x5A4737});

	var mesh = new THREE.Mesh(new THREE.BoxGeometry(26, 112, 24), material);
	mesh.position.set(25, 0, 0);
	bygget.add(mesh);

	var mesh = new THREE.Mesh(new THREE.BoxGeometry(33, 108, 33), material);
	mesh.position.set(13, -(112-108)/2, 0);
	bygget.add(mesh);

	var mesh = new THREE.Mesh(new THREE.BoxGeometry(24, 101, 24), material);
	mesh.position.set(-7, -(112-101)/2, 0);
	bygget.add(mesh);

	var mesh = new THREE.Mesh(new THREE.BoxGeometry(33, 101, 33), material);
	mesh.position.set(-27, -(112-101)/2, 0);
	bygget.add(mesh);

	var material = new THREE.MeshLambertMaterial({color: 0x7C624D});

	for (let i = 0; i < 20; i++) {
		var geometry = new THREE.BoxGeometry(33+0.1, 2, 33+0.1);
		geometry.faces.splice(4,2);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-27, -50 + 4*i, 0);
		bygget.add(mesh);

		var geometry = new THREE.BoxGeometry(33+0.1, 2, 33+0.1);
		geometry.faces.splice(4,2);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(13, -50 + 4*i, 0);
		bygget.add(mesh);
	}

	bygget.rotation.x += 0.35;
	bygget.rotation.y -= 0.4;

	return bygget;
}

var makeOsloOmradet= function() {
	var geometry = new THREE.BoxGeometry(36880, 19260, 10);
	HL.geometry = geometry;
	
	var texture = new THREE.TextureLoader().load("/img/oslo3.png");
	texture.needsUpdate = true;
	
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, map : texture});
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(-100*36.88/22, -400*36.88/22, 0);
	
	var oslo = new THREE.Object3D();
	oslo.add(mesh);

	return oslo;
}

var makeMoon = function() {
	var geometry = new THREE.SphereGeometry(1737000, 160, 120);
	HL.geometry = geometry;
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, emissive: 0x050505});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeEarth = function() {
	var geometry = new THREE.SphereGeometry(6371000, 80, 60);
	HL.geometry = geometry;
	var material = new THREE.MeshLambertMaterial({color: 0x458BBA, emissive: 0x111122});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeMoonOrbit= function() {
	var radius = 385000000;
	var thickness = radius / 900;
	var geometry = new THREE.TorusGeometry(radius, thickness, 100, 100);
	HL.geometry = geometry;
	var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeSun = function() {
	var geometry = new THREE.SphereGeometry(695700000, 80, 60);
	HL.geometry = geometry;
	var material = new THREE.MeshBasicMaterial({color: 0xFFF2C1});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeJupiterOrbit = function() {
	var radius = 778500000000;
	var thickness = radius / 900;
	var geometry = new THREE.TorusGeometry(radius, thickness, 100, 100);
	HL.geometry = geometry;
	var material = new THREE.MeshBasicMaterial({color: 0xDDDDDD, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeSolarSystem = function() {
	var geometry = makeSolarSystemsGeometry();

	var uniforms = {
		time: {value: 0.0},
	};
	window.uniforms = uniforms;
	
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('solarSystemVertexShader').textContent,
		fragmentShader: document.getElementById('solarSystemFragmentShader').textContent,
		depthWrite: false,
		depthTest: false,
		transparent: true
	});

	var points = new THREE.Points(geometry, material);
	HL.astronomicalNumbers.points = points;
	HL.scene.add(points);


	var geometry = new THREE.SphereGeometry(5906376272000, 80, 60);
	HL.geometry = geometry;
	var material = new THREE.MeshBasicMaterial({color: 0x444444});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

var makeSolarSystemsGeometry = function() {
	var geometry = new THREE.BufferGeometry();

	var nofParticles = 3404;
	var ratio = 16/10;
	var square = Math.floor(Math.sqrt(nofParticles));
	var nofParticles2D = new THREE.Vector2(square*(2), square*(1/2));

	var positions = new Float32Array(nofParticles * 3);
	var order = new Float32Array(nofParticles);

	var diameter = 5906376272000*2;
	var spreadX = 1.01;
	var spreadY = 1.2;

	for (var i = 0; i < nofParticles; i++) {
		var x = i % nofParticles2D.x;
		var y = Math.floor(i / nofParticles2D.x);

		positions[i*3 + 0] = (x+1)*diameter*spreadX;
		positions[i*3 + 1] = -(y)*diameter*spreadY;
		positions[i*3 + 2] = 1;

		order[i] = i / nofParticles;
	}

	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.addAttribute('order', new THREE.BufferAttribute(order, 1));

	geometry.computeBoundingSphere();

	return geometry;
}

HL.astronomicalNumbers.animate = function() {
	HL.animationTime = HL.animationTime || 0;
	HL.timeSpeed = HL.timeSpeed || 0;

	HL.horizontalSpeed = HL.horizontalSpeed || 0;
	HL.verticalSpeed = HL.verticalSpeed || 0;

	var debugAcceleration = 1;

	var timeAcceleration = HL.astronomicalNumbers.steps[HL.step].cameraAcceleration * debugAcceleration;

	var horizontalAcceleration = HL.astronomicalNumbers.steps[HL.step].horizontalAcceleration;
	var verticalAcceleration = HL.astronomicalNumbers.steps[HL.step].verticalAcceleration;

	if (HL.camera.position.length() < HL.astronomicalNumbers.steps[HL.step].cameraDistance) {
		var direction = HL.step - HL.lastStep;
		HL.timeSpeed += timeAcceleration;
		HL.animationTime += HL.timeSpeed;

		if (horizontalAcceleration) {
			HL.horizontalSpeed += horizontalAcceleration;
		}
		if (verticalAcceleration) {
			HL.verticalSpeed += verticalAcceleration;
		}
	}
	var newCameraPosition = new THREE.Vector3(HL.horizontalSpeed, HL.verticalSpeed, 12.5).multiplyScalar(1 + HL.animationTime);

	HL.camera.position.copy(newCameraPosition);
	HL.camera.lookAt(new THREE.Vector3(newCameraPosition.x, newCameraPosition.y, 0));

	window.uniforms.time.value = (new Date().getTime() - HL.alpaCentauriStart) / 1000;
}

HL.astronomicalNumbers.cleanup = function() {

}

HL.astronomicalNumbers.steps = {
	0: { // Fridge
		cameraDistance: 0,
		cameraAcceleration: 0
	},
	1: { // Postgirobygget
		cameraDistance: 800,
		cameraAcceleration: 0.002
	},
	2: { // Oslo
		cameraDistance: 1.3e5,
		cameraAcceleration: 0.15
	},
	3: { // Moon
		cameraDistance: 1.85e7,
		cameraAcceleration: 15
	},
	4: { // Earth
		cameraDistance: 7e7,
		cameraAcceleration: 100
	},
	5: { // MoonOrbit
		cameraDistance: 5e9,
		cameraAcceleration: 1e3
	},
	6: { // Sun
		cameraDistance: 8e9,
		cameraAcceleration: 1e4
	},
	7: { // JupiterOrbit
		cameraDistance: 9.5e12,
		cameraAcceleration: 1e6
	},
	8: { // SolarSystem
		cameraDistance: 7e13,
		cameraAcceleration: 5e7
	},
	9: { // Alpha Centauri
		cameraDistance: 5.0e15,
		cameraAcceleration: 2e10,
		horizontalAcceleration: 0.009,
		verticalAcceleration: -0.002
	}
}

HL.astronomicalNumbers.maxStep = 0;
for (var key in HL.astronomicalNumbers.steps) 
	if (parseInt(key) > HL.astronomicalNumbers.maxStep) 
		HL.astronomicalNumbers.maxStep = parseInt(key);

HL.astronomicalNumbers.doStep = function() {
	document.querySelectorAll("span").forEach(function(element) {
		element.classList.add("hidden");
	});

	var step = HL.astronomicalNumbers.steps[HL.step];
	var lastStep = HL.astronomicalNumbers.steps[HL.lastStep];

	if (HL.step == 9) {
		HL.alpaCentauriStart = new Date().getTime();
		HL.astronomicalNumbers.points.visible = true;
	} else {
		HL.astronomicalNumbers.points.visible = false;
	}

	HL.animationStart = new Date().getTime();
}
