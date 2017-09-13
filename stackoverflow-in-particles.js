"use strict";

window.HL = window.HL || {};

HL.stackoverflowInParticles = {}

HL.stackoverflowInParticles.data = users;

var colorGrey = makeArray(function(i) {
	return new THREE.Vector3(0.85, 0.85, 0.85);
})

function makeArray(callback) {
	var array = new Float32Array(HL.stackoverflowInParticles.data.length * 3);

	for (var i = 0; i < HL.stackoverflowInParticles.data.length; i++) {
		var coord = callback(i);
		array[i*3 + 0] = coord.x;
		array[i*3 + 1] = coord.y;
		array[i*3 + 2] = coord.z;
	}

	return array;
}

HL.stackoverflowInParticles.initOnce = function() {

	makeText("Stack Overflow", "stackoverflow", "big stackoverflowstep0", new THREE.Vector3(0, 0.5, 0));
	makeText("Oslo Edition", "stackoverflowInParticles", "bigger stackoverflowstep0", new THREE.Vector3(0, -0.5, 0));

	makeText(HL.minStartDate.getFullYear(), "stackoverflow", "bigish stackoverflowstep2 stackoverflowstep4 stackoverflowstep7 stackoverflowstep9", new THREE.Vector3(-4.5, -2.25, 0));
	makeText(HL.maxStartDate.getFullYear(), "stackoverflowInParticles", "bigish stackoverflowstep2 stackoverflowstep4 stackoverflowstep7 stackoverflowstep9", new THREE.Vector3(4.5, -2.25, 0));
	makeText("Registererte seg", "stackoverflowInParticles", "bigish stackoverflowstep2 stackoverflowstep4 stackoverflowstep7 stackoverflowstep9", new THREE.Vector3(0, 2.5, 0));

	function agePosition(age) {
		let diffAge = HL.maxAge - HL.minAge;
		let top = 2;
		let bottom = -1.25;
		let oneYearLength = (top - bottom)/diffAge;
		return bottom + oneYearLength * (age - HL.minAge);
	}

	makeText(HL.minAge, "stackoverflowInParticles", "stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(-4, -1.25, 0));
	makeText(HL.maxAge, "stackoverflowInParticles", "stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(-4, 2, 0));
	makeText(30, "stackoverflowInParticles", "stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(-4, agePosition(30), 0));
	makeText(40, "stackoverflowInParticles", "stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(-4, agePosition(40), 0));
	makeText(50, "stackoverflowInParticles", "stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(-4, agePosition(50), 0));
	makeText("Alder", "stackoverflowInParticles", "bigish stackoverflowstep3 stackoverflowstep6", new THREE.Vector3(0, 2.5, 0));

	makeText(HL.maxReputation.toLocaleString(), "stackoverflowInParticles", "stackoverflowstep5", new THREE.Vector3(-4.5, 2, 0));
	makeText(Math.floor(HL.maxReputation*0.3).toLocaleString(), "stackoverflowInParticles", "stackoverflowstep5", new THREE.Vector3(-4.5, -0.95, 0));
	makeText(1, "stackoverflowInParticles", "stackoverflowstep5", new THREE.Vector3(-4.5, -2.5, 0));
	makeText("Reputation", "stackoverflowInParticles", "bigish stackoverflowstep5", new THREE.Vector3(0, 2.5, 0));

	makeText("Answers / Questions", "stackoverflowInParticles", "bigish stackoverflowstep8", new THREE.Vector3(0, 2.5, 0));
}

HL.stackoverflowInParticles.init = function() {
	HL.camera.position.set(0, 0, 5)
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));

	HL.camera.fov = 60;
	HL.camera.updateProjectionMatrix();

	var geometry = HL.stackoverflowInParticles.makeGeometry();
	HL.geometry = geometry;

	var uniforms = {
		animationTime: {value: 0.0},
		time: {value: 0.0},
		step: {value: 0.0},
		rotationSpeed: {value: 0.0}
	};
	window.uniforms = uniforms;
	
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('bekkInWebGLVertexshader').textContent,
		fragmentShader: document.getElementById('bekkInWebGLFragmentshader').textContent,
		transparent: true,
		depthWrite: false
	});

	var points = new THREE.Points(geometry, material);
	HL.scene.add(points);

	HL.maxStep = 0;
	for (var key in HL.stackoverflowInParticles.steps) 
		if (parseInt(key) > HL.maxStep)
			HL.maxStep = parseInt(key);

	HL.stackoverflowInParticles.maxStep = HL.maxStep;
}

function makeStackoverflowArray(callback) {
	var array = new Float32Array(HL.stackoverflowInParticles.data.length * 3);

	for (var i = 0; i < HL.stackoverflowInParticles.data.length; i++) {
		var coord = callback(i);
		array[i*3 + 0] = coord.x;
		array[i*3 + 1] = coord.y;
		array[i*3 + 2] = coord.z;
	}

	return array;
}
var positionsStackoverflowCentered = makeStackoverflowArray(function(i) {
	var x = 0;
	var y = 0;
	var z = 0;

	return {x: x, y: y, z: z}
})

var positionsStackoverflowCloud = makeStackoverflowArray(function(i) {
	var maxRadius = 2.3;
	return HL.util.randomPointInsideSphere(new THREE.Vector3(0, 0, 0), maxRadius);
})

var originStackoverflowCenter = makeStackoverflowArray(function(i) {
	return new THREE.Vector3(0, 0, 0);
});

var colorStackoverflowGrey = makeStackoverflowArray(function(i) {
	return new THREE.Vector3(0.85, 0.85, 0.85);
})

HL.maxAge = 0;
HL.minAge = 100;
HL.maxStartDate = new Date(0);
HL.minStartDate = new Date();
HL.maxReputation = 0;
HL.minReputation = 1e9;

for (let user of HL.stackoverflowInParticles.data) {
	if (user.age > 90) {
		delete user.age;
	}

	if (user.age) {
		HL.maxAge = Math.max(user.age, HL.maxAge);
		HL.minAge = Math.min(user.age, HL.minAge);	
	}

	user.creation_date = Math.floor(parseFloat(user.creation_date)*1000);

	let answersCountField = user.answersCount;
	if (!answersCountField) user.answersCount = {antall: 0};
	user.answersCount.antall = parseInt(user.answersCount.antall);

	let questionsField = user.questions;
	if (!questionsField) user.questions = [];
	if (!(questionsField instanceof Array)) user.questions = [questionsField];

	var startDate = new Date(user.creation_date);
	HL.maxStartDate = new Date(Math.max(startDate, HL.maxStartDate));
	HL.minStartDate = new Date(Math.min(startDate, HL.minStartDate));

	HL.maxReputation = Math.max(user.reputation, HL.maxReputation);
	HL.minReputation = Math.min(user.reputation, HL.minReputation);
}

var positionsAge = makeArray(function(i) {
	var age = HL.stackoverflowInParticles.data[i].age;

	var scrambling = 0.05;
	var xSpread = 1/15;
	var ySpread = 1/15;
	var range = HL.maxAge-HL.minAge;
	var topSpread = 1;
	var grouping = 4;

	age -= age % grouping;

	if (age == 0) xSpread *= 0.65;

	var x = HL.util.randomFloat(-1, 1) * (-HL.maxAge-topSpread+age) * xSpread;
	var y = 4/8 + (age - HL.maxAge+range/2) * ySpread + Math.random() * scrambling;
	var z = 0;

	return {x: x, y: y, z: z}
})

// TODO: DRY with positionsAge
var positionsReputation = makeArray(function(i) {
	var reputation = HL.stackoverflowInParticles.data[i].reputation;

	var scrambling = 0.0;
	var xSpread = 1/15000;
	var ySpread = 1/12500;
	var range = HL.maxReputation-HL.minReputation;
	var topSpread = 1;
	var grouping = 10;

	reputation -= reputation % grouping;

	var x = HL.util.randomFloat(-1, 1) * (-HL.maxReputation-topSpread + reputation) * xSpread;
	var y = -1/8 + (reputation - HL.maxReputation+range/2) * ySpread + Math.random() * scrambling;
	var z = 0;

	return {x: x, y: y, z: z}
})

var positionsStartDate = makeArray(function(i) {
	var startDate = new Date(HL.stackoverflowInParticles.data[i].creation_date);

	var month = startDate.getMonth();
	var year = startDate.getYear();

	var yearRange = HL.maxStartDate.getYear() - HL.minStartDate.getYear();
	var yearDiff = year - HL.minStartDate.getYear();
	var yearNormalized = yearDiff - yearRange/2;

	var monthNormalized = month - 11/2;

	var yearSpacing = 1.1;
	var monthSpacing = yearSpacing / 12;

	return {
		x: yearNormalized * yearSpacing + monthNormalized * monthSpacing, 
		y: HL.util.randomFloat(-2, 2), 
		z: 0
	}
})

var positionsAnswerRatio = makeArray(function(i) {
	var answersCount = HL.stackoverflowInParticles.data[i].answersCount.antall;
	var questionCount = HL.stackoverflowInParticles.data[i].questions.length;

	let ratioNormalized = answersCount - questionCount;
	const spread = 0.007;

	return {
		x: ratioNormalized * spread - 3, 
		y: HL.util.randomFloat(-2, 2), 
		z: 0
	}
})

var colorAnswerRatio = makeArray(function(i) {
	var answersCount = new Date(HL.stackoverflowInParticles.data[i].answersCount.antall);
	var questionCount = new Date(HL.stackoverflowInParticles.data[i].questions.length);

	let ratioNormalized = answersCount - questionCount;

	let color;

	if (ratioNormalized > 1) 
		color = new THREE.Vector3(0.3, 0.3, 1.0)
	else if (ratioNormalized < -1) 
		color = new THREE.Vector3(1.0, 0.3, 0.3)
	else 
		color = new THREE.Vector3(0.8, 0.8, 0.2)

	return color;
})

var colorAge = makeArray(function(i) {
	var age = HL.stackoverflowInParticles.data[i].age;
	var ageNormalized = (age-HL.minAge)/(HL.maxAge-HL.minAge);
	var oldColor = new THREE.Vector3(0.0, 0.0, 1.0);
	var youngColor = new THREE.Vector3(0.2, 1.0, 0.2);
	var color = youngColor.lerp(oldColor, ageNormalized);

	if (!age) color = new THREE.Vector3(0.3, 0.3, 0.3)
	return color;
})

var colorReputation = makeArray(function(i) {
	var reputation = HL.stackoverflowInParticles.data[i].reputation;
	var normalized = (reputation-HL.minReputation)/(HL.maxReputation-HL.minReputation);
	var highColor = new THREE.Vector3(0.0, 0.5, 1.0);
	var midColor = new THREE.Vector3(1.0, 0.5, 0.0);
	var lowColor = new THREE.Vector3(0.3, 0.2, 0.0).lerp(new THREE.Vector3(1.0, 0.5, 0.0), normalized/0.030);
	var color = normalized < 0.030 ? lowColor : (normalized < 0.3 ? midColor : highColor);
	return color;
})

HL.stackoverflowInParticles.steps = {
	0: {positions: positionsStackoverflowCentered},
	1: {positions: positionsStackoverflowCloud, rotationOrigins: originStackoverflowCenter},
	2: {positions: positionsStartDate, colors: colorStackoverflowGrey},
	3: {positions: positionsAge, colors: colorAge},
	4: {positions: positionsStartDate, colors: colorAge},
	5: {positions: positionsReputation, colors: colorReputation},
	6: {positions: positionsAge, colors: colorReputation},
	7: {positions: positionsStartDate, colors: colorReputation},
	8: {positions: positionsAnswerRatio, colors: colorAnswerRatio},
	9: {positions: positionsStartDate, colors: colorAnswerRatio},
};

HL.stackoverflowInParticles.makeGeometry = function() {
	var geometry = new THREE.BufferGeometry();

	var step0 = HL.stackoverflowInParticles.steps[0].positions;
	var step0Copy1 = step0.slice(0);
	var step0Copy2 = step0.slice(0);
	var step0Copy3 = step0.slice(0);
	var greyCopy = colorGrey.slice(0);

	geometry.addAttribute('position', new THREE.BufferAttribute(step0, 3));
	geometry.addAttribute('currentPosition', new THREE.BufferAttribute(step0Copy1, 3));
	geometry.addAttribute('targetPosition', new THREE.BufferAttribute(step0Copy2, 3));
	geometry.addAttribute('color', new THREE.BufferAttribute(greyCopy, 3));
	geometry.addAttribute('rotationOrigin', new THREE.BufferAttribute(step0Copy3, 3));

	var deviance = new Float32Array(HL.stackoverflowInParticles.data.length)
	for (var i = 0; i < HL.stackoverflowInParticles.data.length; i++) {
		deviance[i] = HL.util.randomFloat(0, 1);
	}
	geometry.addAttribute('deviance', new THREE.BufferAttribute(deviance, 1));

	geometry.computeBoundingSphere();

	return geometry;
}

HL.stackoverflowInParticles.doStep = function() {
	var currentPositionArray = HL.geometry.getAttribute("currentPosition").array;
	var targetPositionArray = HL.geometry.getAttribute("targetPosition").array;
	var colorArray = HL.geometry.getAttribute("color").array;
	var rotationOriginArray = HL.geometry.getAttribute("rotationOrigin").array;

	var step = HL.stackoverflowInParticles.steps[HL.step];
	var lastStep = HL.stackoverflowInParticles.steps[HL.lastStep];

	function arrayCopy(source, target) {
		for (var i = 0; i < source.length; i++) {
			target[i] = source[i];
		}
	};

	arrayCopy(lastStep.positions, currentPositionArray);
	arrayCopy(step.positions, targetPositionArray);

	if (step.colors != undefined) {
		var colors = step.colors;
	} else {
		var colors = colorGrey;
	}

	arrayCopy(colors, colorArray);

	if (step.rotationOrigins != undefined) {
		window.uniforms.rotationSpeed.value = 0.1;
		arrayCopy(step.rotationOrigins, rotationOriginArray);
	} else {
		window.uniforms.rotationSpeed.value = 0.0;
	}
	
	HL.geometry.getAttribute("currentPosition").needsUpdate = true
	HL.geometry.getAttribute("targetPosition").needsUpdate = true
	HL.geometry.getAttribute("color").needsUpdate = true
	HL.geometry.getAttribute("rotationOrigin").needsUpdate = true
	HL.geometry.computeBoundingSphere();

	HL.animationStart = new Date().getTime();

	HL.util.addAndRemoveClass("span", '.stackoverflowstep' + HL.step, "hidden");
}

HL.stackoverflowInParticles.cleanup = function() {
	
}

HL.stackoverflowInParticles.animate = function() {
	var secondsPerAnimation = 2;

	var animationTime = (new Date().getTime() - HL.animationStart) / 1000 / secondsPerAnimation;

	window.uniforms.animationTime.value = animationTime;
	window.uniforms.time.value = (new Date().getTime() - HL.timeStart) / 1000;
	window.uniforms.step.value = HL.step;
}