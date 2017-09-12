"use strict";

window.HL = window.HL || {};

HL.intro = HL.intro || {}

HL.step = 0;

HL.intro.stepSize = 10;
HL.intro.maxStep = 6;

HL.intro.initOnce = function() {
	makeText("Visualisering av", null, "big intro", new THREE.Vector3(0, 0.65, 0));
	makeText("en milion datapunkter", null, "big intro", new THREE.Vector3(0, 0.25, 0));
	makeText("i sanntid", null, "big intro", new THREE.Vector3(0, -0.15, 0));
	makeText("Holger Ludvigsen", null, "smaller intro", new THREE.Vector3(0, -0.8, 0));
	makeText("Bekk Consulting", null, "smaller intro", new THREE.Vector3(0, -0.95, 0));

	makeText("Datavisualisering", null, "big intro", new THREE.Vector3(HL.intro.stepSize, 0.4, 0));
	makeText("i tre dimensjoner", null, "big intro", new THREE.Vector3(HL.intro.stepSize, 0, 0));
	makeText("med WebGL", null, "big intro", new THREE.Vector3(HL.intro.stepSize, -0.4, 0));

	makeText("Open source", null, "big intro", new THREE.Vector3(HL.intro.stepSize*2 - 1.2, 0, 0));
	makeText("holgerl.github.io/javazone-2017", null, "intro", new THREE.Vector3(HL.intro.stepSize*2 + 1.2, 0, 0));

	var dataText = 
'{"2009":{"8":0.01,"java":0.76,"test":0.2,"spring":0.14,<br/>'+
'"soa":0.13,"cloud":0.12,"service":0.12,"ejb":0.11,"data<br/>'+
'base":0.11,"maven":0.1,"javascript":0.08,"android":0.08<br/>'+
',"ee":0.07,"functional":0.06,"jvm":0.06,"go":0.06,"groo<br/>'+
'vy":0.05,"scala":0.05,"native":0.02,"\n\njavascript":0.<br/>'+
'01},"2010":{"8":0.01,"java":0.58,"test":0.35,"scala":0.<br/>'+
'14,"spring":0.12,"javascript":0.12,"erlang":0.11,"datab<br/>'+
'ase":0.11,"nosql":0.1,"service":0.09,"cloud":0.08,"secu<br/>'+
'rity":0.08,"soa":0.07,"git":0.07,"go":0.07,"android":0.<br/>'+
'06,"maven":0.06,"jvm":0.05,"groovy":0.05,"functional":0<br/>'+
'.02,"native":0.02,"ee":0.02,"mongodb":0.02,"\n\nscala":0.01}';

	var node = makeText("", null, "smaller intro", new THREE.Vector3(HL.intro.stepSize*3 - 1.5, -0.25, 0));
	node.innerHTML = dataText;
	makeText("data", null, "bigger intro", new THREE.Vector3(HL.intro.stepSize*3 - 1.5, 1.05, 0));
	makeText("visualisering", null, "bigger intro", new THREE.Vector3(HL.intro.stepSize*3 + 1.5, 1.05, 0));

	makeText("Grav frem", null, "big intro", new THREE.Vector3(HL.intro.stepSize*4 - 1.5, 0.75, 0));
	makeText("budskapet i dataene", null, "big intro", new THREE.Vector3(HL.intro.stepSize*4 - 1.5, 0.25, 0));
	makeText("Sammenhenger<br/>St&oslash;rrelser<br/>Endringer", null, "intro", new THREE.Vector3(HL.intro.stepSize*4 - 1.5, -0.5, 0));

	makeText("WebGL", null, "big intro", new THREE.Vector3(HL.intro.stepSize*5 - 1, 0.55, 0));
	makeText("Et Javascript-API<br/>for 3D (og 2D) grafikk<br/>på web", null, "intro", new THREE.Vector3(HL.intro.stepSize*5 + 1, 0.55, 0));

	makeText("Budskap", null, "bigger intro", new THREE.Vector3(HL.intro.stepSize*6, 0.5, 0));
	makeText("WebGL er kjempebra<br/>for datavisualisering", null, "bigish intro", new THREE.Vector3(HL.intro.stepSize*6, -0.5, 0));

}

HL.intro.init = function() {
	HL.camera.position.set(0, 0, 5);
	HL.camera.lookAt(new THREE.Vector3(0, 0, 0));
	HL.camera.fov = 40;
	HL.camera.updateProjectionMatrix();

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy(new THREE.Vector3(HL.intro.stepSize*3 + 1.5, -0.25, 0));
	HL.intro.rotatingBox = mesh;
	HL.scene.add(mesh)

	HL.intro.sinus = []
	for (var i = 0; i<5; i++) {
		var geometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
		var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.copy(new THREE.Vector3(HL.intro.stepSize*4 + 1 + 0.4*i, 0, 0));
		HL.intro.sinus.push(mesh);
		HL.scene.add(mesh)
	}

	HL.intro.uniforms = {time: {value: 0.0}};

	var geometry = HL.util.gridGeometry(10, 10, 4.25, 4.25);
	var material = new THREE.ShaderMaterial({
		uniforms: HL.intro.uniforms,
		vertexShader: document.getElementById('gridVertexShader').textContent,
		fragmentShader: document.getElementById('whiteFragmentShader').textContent
	});
	var line = new THREE.LineSegments(geometry, material);
	line.position.copy(new THREE.Vector3(HL.intro.stepSize*5, -0.75, 0));
	line.material.depthTest = false;
	line.material.opacity = 0.5;
	line.material.transparent = true;
	HL.scene.add(line)

	var light = new THREE.DirectionalLight();
	light.position.set(2, 8, 3);
	HL.scene.add(light);

	var light = new THREE.AmbientLight(0x202020);
	HL.scene.add(light);
}


HL.intro.animate = function() {
	var stepSpeed = 1/10;
	var cameraDiff = HL.step*HL.intro.stepSize - HL.camera.position.x;
	HL.camera.position.x += cameraDiff * stepSpeed;

	for (var i in HL.intro.sinus) {
		var soyle = HL.intro.sinus[i];
		var sinwave = Math.sin(new Date().getTime()/2000.0+i*0.8);
		soyle.scale.set(1, 2.3 + 2.0*sinwave, 1);
	}

	HL.intro.uniforms.time.value = (new Date().getTime() - HL.timeStart) / 1000;

	HL.intro.rotatingBox.rotation.z += 0.003;
	HL.intro.rotatingBox.rotation.y = 1;
}

HL.intro.cleanup = function() {

}

HL.intro.doStep = function() {
	HL.util.addAndRemoveClass("span", '.intro', "hidden");
}
