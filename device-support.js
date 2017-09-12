"use strict";

window.HL = window.HL || {};
HL.deviceSupport = HL.deviceSupport || {}

HL.step = 0;
HL.deviceSupport.maxStep = 42;
HL.deviceSupport.stepSize = 10;
HL.deviceSupport.stepSpeed = 1/10;

HL.deviceSupport.browsers = [
	"Firefox", "Chrome", "IE", "Edge", "Safari", "Opera", "iOS Safari", "Opera Mini", "Android Browser", "Android Chrome", "Firefox for Android", "iOS Chrome"
];

HL.deviceSupport.boxes = [];
HL.deviceSupport.dust = [];

HL.deviceSupport.initOnce = function() {
	makeText("caniuse?", null, "bigger deviceSupportStep0", new THREE.Vector3(0, 0.25, 0));

	makeText("Device support", null, "big deviceSupportStep1plus", new THREE.Vector3(HL.deviceSupport.stepSize, 1.25, 0));
	
	HL.deviceSupport.percent = makeText("X %", null, "bigger deviceSupportStep14 deviceSupportStep15 deviceSupportStep16 deviceSupportStep17", new THREE.Vector3(HL.deviceSupport.stepSize*2, 0.5, 0));
	HL.deviceSupport.cssTransPercentPosition = new THREE.Vector3(0, -0.5, 0);
	HL.deviceSupport.cssTransPercent = makeText("X %", null, "bigger deviceSupportStep16 deviceSupportStep17", HL.deviceSupport.cssTransPercentPosition);

	makeText("Device support i Norge", null, "big deviceSupportStep14 deviceSupportStep15 deviceSupportStep16 deviceSupportStep17", new THREE.Vector3(HL.deviceSupport.stepSize*2, 1.5, 0));

	makeText("WebGL", null, "big deviceSupportStep14 deviceSupportStep15 deviceSupportStep16 deviceSupportStep17", new THREE.Vector3(HL.deviceSupport.stepSize*2 - 1.55, -1.5, 0));

	makeText("Kilde: caniuse.com", null, "deviceSupportStep14 deviceSupportStep15 deviceSupportStep16 deviceSupportStep17", new THREE.Vector3(HL.deviceSupport.stepSize*2, 1.3, 0));

	HL.deviceSupport.cssTransPosition = new THREE.Vector3(HL.deviceSupport.stepSize*3, -1.5, 0);
	makeText("CSS Transforms", null, "big deviceSupportStep14 deviceSupportStep15 deviceSupportStep16 deviceSupportStep17", HL.deviceSupport.cssTransPosition);

	makeText("holgerl.github.io/javazone-2017", null, "big deviceSupportStep18", new THREE.Vector3(HL.deviceSupport.stepSize*4, 1.5, 0));
}

HL.deviceSupport.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	let spreadX = 1.85;
	let spreadY = 0.5;

	for (let browser of HL.deviceSupport.browsers) {
		var texture = new THREE.TextureLoader().load("./img/browsers/"+browser+".png");
		texture.needsUpdate = true;
		texture.anisotropy = true;

		let box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.01), new THREE.MeshBasicMaterial({color: 0xDDDDDD, map: texture}));
		let index = HL.deviceSupport.browsers.indexOf(browser);
		let length = HL.deviceSupport.browsers.length;
		
		box.targetPosition = new THREE.Vector3(
			Math.floor(index / (length / 3)) * spreadX + HL.deviceSupport.stepSize - 1.9,
			0.6 - (index % Math.ceil(length / 3)) * spreadY,
			0
		);

		box.position.set(HL.deviceSupport.stepSize, -2, 4);
		
		HL.scene.add(box);
		HL.deviceSupport.boxes.push(box);
	}

	var texture = new THREE.TextureLoader().load("./img/cloud4.png");
	texture.needsUpdate = true;
	texture.anisotropy = true;
	let cloud = new THREE.Mesh(new THREE.BoxGeometry(1.5+0.6, 0.3+0.2, 0.001), 
		new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.0, map: texture})
	);
	HL.scene.add(cloud);
	HL.deviceSupport.cloud = cloud;

	for (let i = 0; i < 20; i++) {
		let size = HL.util.randomFloat(0.02, 0.04);
		let dust = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 0}));
		//dust.visible = false;
		dust.deviance1 = Math.random();
		dust.deviance2 = Math.random();
		dust.deviance3 = Math.random();
		HL.scene.add(dust);
		HL.deviceSupport.dust.push(dust);
	}

	const bar = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), 
		new THREE.MeshLambertMaterial({color: 0xFFFFFF})
	);
	bar.scale.set(0.6, 0.05, 0.6);
	HL.scene.add(bar);
	HL.deviceSupport.bar = bar;
	bar.position.set(HL.deviceSupport.stepSize*2 - 1.5, (-2.3/2 + 0.05/2), 0);


	const bar2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), 
		new THREE.MeshLambertMaterial({color: 0xDDDDDD, emissive: 0x555555})
	);
	bar2.scale.set(0.6, 0.05, 0.6);
	HL.scene.add(bar2);
	HL.deviceSupport.bar2 = bar2;
	bar2.position.set(HL.deviceSupport.stepSize*3, (-2.3/2 + 0.05/2), 0);

	var light = new THREE.DirectionalLight();
	light.position.set(3, 5, 8);
	HL.scene.add(light);
}

HL.deviceSupport.animate = function() {
	let barStep = 2 + HL.deviceSupport.browsers.length;
	let webcamStep = 18;

	if (HL.step <= 1 || HL.step == barStep || HL.step == webcamStep) {
		let actualStep = HL.step <= 1 ? HL.step : HL.step - HL.deviceSupport.browsers.length;
		if (HL.step == webcamStep) actualStep = 4;

		var cameraDiff = actualStep * HL.deviceSupport.stepSize - HL.camera.position.x;
		HL.camera.position.x += cameraDiff * HL.deviceSupport.stepSpeed;
	}

	if (HL.step == barStep + 1) {
		let targetScaleY = 2.3;
		let speed = 0.05;
		let diff = targetScaleY - HL.deviceSupport.bar.scale.y;
		HL.deviceSupport.bar.scale.y += diff * speed;
		HL.deviceSupport.bar.position.y = (-2.3/2 + HL.deviceSupport.bar.scale.y/2);

		HL.deviceSupport.percent.innerText = (94.4 * (1-diff/2.3)).toFixed(1) + " %" ;
	}

	if (HL.step == barStep + 2) {
		let targetPositionX = HL.deviceSupport.stepSize*2 + 1.5;
		let speed = 0.05;
		let diff = targetPositionX - HL.deviceSupport.bar2.position.x;
		HL.deviceSupport.bar2.position.x += diff * speed;

		HL.deviceSupport.cssTransPercentPosition.x = HL.deviceSupport.bar2.position.x - 1.5;

		HL.deviceSupport.cssTransPosition.x = HL.deviceSupport.bar2.position.x; 
	}

	if (HL.step == barStep + 3) {
		let targetScaleY = 2.3;
		let speed = 0.05;
		let diff = targetScaleY - HL.deviceSupport.bar2.scale.y;
		HL.deviceSupport.bar2.scale.y += diff * speed;
		HL.deviceSupport.bar2.position.y = (-2.3/2 + HL.deviceSupport.bar2.scale.y/2);

		HL.deviceSupport.cssTransPercent.innerText = (94.0 * (1-diff/2.3)).toFixed(1) + " %" ;
	}

	let speed = 0.5;

	if (HL.step >= 2) {
		var currentBox = HL.deviceSupport.boxes[HL.step - 2]
		if (currentBox) {
			let diff = currentBox.targetPosition.clone().sub(currentBox.position);
			let diffLength = diff.length();
			let translate = diff.normalize().multiplyScalar(Math.min(speed, diffLength));
			currentBox.position.add(translate);

			if (diffLength < 0.2 && currentBox.dustStart == undefined) currentBox.dustStart = new Date().getTime();

			if (currentBox.dustStart != undefined) {
				let dustDiff = (new Date().getTime() - currentBox.dustStart) / 1000;

				for (let dust of HL.deviceSupport.dust) {
					let xDir = dust.deviance3 > 0.5 ? -1 : 1;
					let startPosition = currentBox.position.clone().add(
						new THREE.Vector3(
							1.5/2 * xDir, 
							0.2/2 * (dust.deviance2 * 2 - 1), 
							0
						)
					);

					let offset = new THREE.Vector3(
						dustDiff * 2 * (0.5 + dust.deviance1) * xDir,
						-Math.pow(dustDiff, 2) * 4,
						0
					);
					dust.position.copy(offset.add(startPosition));

					dust.material.opacity = HL.util.clamp(1-2*dustDiff, 0, 1);
				}

				HL.deviceSupport.cloud.position.copy(currentBox.position)
				HL.deviceSupport.cloud.material.opacity = HL.util.clamp((1-2*dustDiff)/2 - 0.1, 0, 1);
				HL.deviceSupport.cloud.material.needsUpdate = true;
			}
		} 
	}
}

HL.deviceSupport.cleanup = function() {
	if (HL.stream) {		
		var track = HL.stream.getTracks()[0];
		track.stop();	
	}
	HL.util.addAndRemoveClass("video", "foobar", "hidden");
}

HL.deviceSupport.doStep = function() {
	HL.util.addAndRemoveClass("span", ".deviceSupportStep" + HL.step, "hidden");

	if (HL.step >= 1 && HL.step < 2 + HL.deviceSupport.browsers.length)
		HL.util.addAndRemoveClass("span", ".deviceSupportStep1plus", "hidden");

	for (let box of HL.deviceSupport.boxes) {
		box.visible = HL.step > 1;
	}

	var video = document.querySelector("#videoElement");

	if (HL.step == 2 + HL.deviceSupport.browsers.length + 1) {

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
		 
		if (navigator.getUserMedia) {       
		    navigator.getUserMedia({video: true}, handleVideo, videoError);
		}
		 
		function handleVideo(stream) {
			HL.stream = stream;
		    video.src = window.URL.createObjectURL(stream);
		}
		 
		function videoError(e) {
		    // do something
		}
	} else {
	}
}
