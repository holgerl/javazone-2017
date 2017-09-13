"use strict";

window.HL = window.HL || {};
HL.main = HL.main || {};

HL.timeStart = new Date().getTime();
HL.animationStart = new Date().getTime();

HL.acts = {
	0: HL.intro,
	1: HL.agenda,
	2: HL.correlationsIntro,
	3: HL.stackoverflowInParticles,
	4: HL.astronomicalNumbersIntro,
	5: HL.astronomicalNumbers,
	6: HL.buzzwordsIntro,
	7: HL.buzzwords,
	8: HL.moneyTalksIntro,
	9: HL.moneyTalks,
	10: HL.howWebGLWorks,
	11: HL.deviceSupport,
	12: HL.whyPerformance,
	13: HL.realtimeData,
	14: HL.outro
}

HL.act = 0;
HL.lastAct = 0;

HL.step = 0;
HL.lastStep = 0;

HL.stepStart = new Date().getTime();

HL.maxAct = Object.keys(HL.acts).length - 1;

// Prevent scrolling
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;  
}
window.onwheel = preventDefault; // modern standard
window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
window.ontouchmove  = preventDefault; // mobile

HL.main.main = function() {
	var renderer = new THREE.WebGLRenderer({antialias: false, logarithmicDepthBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(0x1D1D1D);
	renderer.domElement.setAttribute('id', 'renderer');
	renderer.setSize(window.innerWidth, window.innerHeight);
	HL.renderer = renderer;

	var ratio = renderer.getContext().drawingBufferWidth / renderer.getContext().drawingBufferHeight;
	
	var camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 1e17);
	HL.camera = camera;

	document.body.appendChild(renderer.domElement);

	HL.domElement = renderer.domElement;

	HL.util.addResizeListener(camera, renderer);

	var scene = new THREE.Scene();
	HL.scene = scene;
	HL.camera = camera;

	setupKeyListener(HL.domElement);

	for (let i in HL.acts) {
		let act = HL.acts[i];
		if (act.initOnce) act.initOnce();
	}

	var act = HL.acts[HL.act];
	act.init();
	act.doStep();

	animate();
}

var setupKeyListener = function(domElement) {
	function switchAct(dir) {
		HL.lastAct = HL.act;

		HL.act += dir;
		if (HL.act < 0) HL.act = HL.maxAct;
		HL.act %= HL.maxAct + 1;

		HL.switchAct();
	}

	function switchStep(dir) {
		var act = HL.acts[HL.act];

		HL.lastStep = HL.step;
		//if (HL.step == act.maxStep && dir == 1) return;

		HL.step += dir;
		if (HL.step < 0) HL.step = act.maxStep;
		HL.step %= act.maxStep + 1;

		var act = HL.acts[HL.act];

		HL.stepStart = new Date().getTime()

		act.doStep();
	}

	document.addEventListener("keyup", function(e) {

		if (e.which == 38 || e.which == 40) {
			var dir = 0;
			if (e.which == 38) dir = -1;
			if (e.which == 40) dir = 1;

			switchAct(dir);
		} else if (e.which == 37 || e.which == 39) {
			var dir = 0;
			if (e.which == 37) dir = -1;
			if (e.which == 39) dir = 1;

			switchStep(dir);
		}
	});

	function mouseUpHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		if (e.clientY > window.innerHeight * 0.85) {
			switchAct(1);
		} else if (e.clientY < window.innerHeight * 0.15) {
			switchAct(-1);
		} else if (e.clientX < window.innerWidth * 0.15) {
			switchStep(-1);
		} else {
			switchStep(1);
		}
	}

	domElement.addEventListener("click", mouseUpHandler);

	window.addEventListener("orientationchange", () => {
		//location.reload();
		domElement.style.display = 'none';
		setTimeout(() => {
			domElement.offsetHeight;
			domElement.style.display = 'block'
			domElement.style.width = '100%'

			HL.renderer.setSize(window.innerWidth, window.innerHeight);
			HL.camera.aspect = window.innerWidth / window.innerHeight;
			HL.camera.updateProjectionMatrix();
		}, 100);
	});

}

HL.switchAct = function() {
	var act = HL.acts[HL.act];
	var lastAct = HL.acts[HL.lastAct];

	HL.step = 0;
	HL.lastStep = 0;

	lastAct.cleanup()

	clearScene();

	HL.stepStart = new Date().getTime()

	act.init();
	act.doStep();
}

var clearScene = function() {
	document.querySelectorAll('span').forEach(function(element) {
		element.classList.add('hidden');
	});

	var toBeRemoved = []; // Because can not remove from children while iterating the same list of children

	HL.scene.children.forEach(function(object) {
		toBeRemoved.push(object)
	});

	toBeRemoved.forEach(function(object) {
		HL.scene.remove(object);
	});
}

function animate() {
	requestAnimationFrame(animate);

	for (var i in HL.textNodes) {
		var node = HL.textNodes[i];
		var position3D = node.position3D;
		HL.util.setHTMLElementPosition(node, position3D, HL.camera);
	}

	HL.stepTimeDiff = (new Date().getTime() - HL.stepStart) / 1000;

	var act = HL.acts[HL.act];
	act.animate();

	HL.renderer.render(HL.scene, HL.camera);
}

HL.textNodes = [];

function makeText(text, id, className, position) {
	var node = document.createElement("span");
	node.innerHTML = text;
	node.setAttribute("class", "hidden");
	if (id) node.setAttribute("id", id);
	if (className) {
		var split = className.split(" ");
		for (var i in split)
		node.classList.add(split[i]);
	}
	if (position) {
		//screenPosition.add(new THREE.Vector2(1, 1)).multiplyScalar(1/2).multiplyScalar(100).floor();
		//node.setAttribute("style", "position: absolute; left: " + screenPosition.x + "%; top: " + screenPosition.y + "%;");
		node.position3D = position;
		HL.textNodes.push(node);
	}
	document.getElementsByTagName("body")[0].appendChild(node);
	return node;
}

function makeImage(srcUrl, size, position) {
	var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
	var texture = new THREE.TextureLoader().load(srcUrl);
	texture.needsUpdate = true;
	texture.anisotropy = true;
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, map : texture});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy(position)
	HL.scene.add(mesh)
	return mesh;
}