"use strict";

window.HL = window.HL || {};
HL.util = HL.util || {};

HL.util.clamp = function(number, from, to) {
	return Math.max(Math.min(number, to), from);
}

HL.util.randomInt = function(from, to, seed) {
	return Math.floor(HL.util.randomFloat(from, to+1, seed));
}

HL.util.randomFloat = function(from, to, seed) {
	return HL.util.random(seed)*(to-from)+from;
}

HL.util.random = function(seed) {
	var scope = HL.util.random;
	
	scope.MAX = scope.MAX || Math.pow(2, 32);
	scope.a = 1664525;
	scope.c = 1013904223;
	
	scope.seeds = scope.seeds || {};

	seed = seed || 0;
	var key = seed;
	if (typeof seed == "string") {
		if (scope.seeds[seed] == undefined) {
			var numeric = HL.util.numberFromString(seed);
			scope.seeds[seed] = numeric; // Memoization
			seed = numeric;
		} else {
			seed = scope.seeds[seed];
		}
	} 
	scope.series = scope.series || {};
	scope.series[key] = scope.series[key] || seed;
	
	var lastRandom = scope.series[key];
	var newRandom = (scope.a * lastRandom + scope.c) % scope.MAX;
	
	scope.series[key] = newRandom;
	
	return newRandom/scope.MAX;
}

HL.util.resetRandomSeries = function(prefix) {
    var toBeCleared = [];
    for (var i in HL.util.random.series) {
        if (i.indexOf(prefix) == 0) toBeCleared.push(i);
    }
    for (var i in toBeCleared) {
        delete HL.util.random.series[toBeCleared[i]];
    }
}

HL.util.addResizeListener = function(camera, renderer) {
	window.addEventListener('resize', function() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
}

HL.util.asyncJSONCall = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//console.log(xhr.responseText);
				callback(JSON.parse(xhr.responseText));
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}

/* NEWER BETTER VERSION?
function asyncHTTP(url, callback) {
	function printXhr(xhr) {
		return xhr.status + " " + xhr.statusText + " from " + url;
	}
	var xhr = new http.XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(printXhr(xhr));
				callback(xhr.responseText);
			} else {
				console.error(printXhr(xhr));
			}
		}
	};
	xhr.onerror = function (e) {
		console.error(printXhr(xhr));
	};
	xhr.send(null);
}
*/

HL.util.connectWebSocket = function(uri, callback) {
	var socket;

	function write(s) {
		console.log(s);
	}

	function doConnect() {
		socket = new WebSocket(uri);
		socket.onopen = function() {write("opened " + uri)};
		socket.onclose = function() {write('closed')};
		socket.onmessage = function(e) {
			write("Received: " + e.data);
			callback(e);
		};
		socket.onerror = function(e) {write("Error:  " + e.data)};
	}

	doConnect();
}

HL.util.updateUniforms = function(uniforms, values) {
	for (var key in uniforms) {
		if (values[key] != undefined) {
			uniforms[key].value = values[key];
		}
	}
}

HL.util.addUniforms = function(uniforms, values) {
	for (var key in values) {
		var value = values[key];
		if (typeof value == 'number' 
				|| value instanceof THREE.Vector3
				|| value instanceof THREE.Vector2
				|| value instanceof THREE.Color) {
			uniforms[key] = {value: value};
		}
	}
}

HL.util.rotatePointAroundOriginAxisAngle = function(point, origin, axis, angle) {
	var diff = point.clone().sub(origin);
	var newDiff = diff.clone().applyAxisAngle(axis, angle);
	var newPoint = origin.clone().add(newDiff);
	point.copy(newPoint); // in place
}

HL.util.vectorToString = function(vector) {
    return JSON.stringify([
    	parseFloat(vector.x.toFixed(2)), 
    	parseFloat(vector.y.toFixed(2)),
    	parseFloat(vector.z.toFixed(2))
    ]);
}

HL.util.easeOutCubic = function(t) {
	t--;
	return t*t*t + 1.0;
}

HL.util.easeOutCubicInverse = function(t) {
	return t*t*t;
}

HL.util.easeOutQuadratic = function(t) {
	t--;
	return 1-t*t;
}

HL.util.easeOutQuadraticInverse = function(t) {
	return t*t;
}

HL.util.linear = function(a, b, t) {
	return a + (b-a)*t;
}

HL.util.setupMouseControlsCamera = function(domElement, parameters, camera) {
	domElement.addEventListener('contextmenu', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});
	domElement.addEventListener("mousedown", function(e) {
		HL.mousedown = true;
		HL.mouseButton = e.button == 0 ? "left" : "right";
		HL.mouseClickPos = new THREE.Vector2(e.clientX, e.clientY);
		HL.oldCameraPos = new THREE.Vector3().fromArray(JSON.parse(parameters.cameraPosition));
		HL.oldCameraLookat = new THREE.Vector3().fromArray(JSON.parse(parameters.cameraLookat));
		HL.oldCameraUp = new THREE.Vector3(0, 1, 0).clone().applyEuler(camera.rotation);
	});
	domElement.addEventListener("mouseup", function(e) {
		HL.mousedown = false;
	});
	domElement.addEventListener("mousewheel", function(e) {
		var diff = e.wheelDelta / 100;
		HL.oldCameraPos = new THREE.Vector3().fromArray(JSON.parse(parameters.cameraPosition));
		HL.oldCameraLookat = new THREE.Vector3().fromArray(JSON.parse(parameters.cameraLookat));
		
		var oldCameraDirection = HL.oldCameraLookat.clone().sub(HL.oldCameraPos).normalize();

	    var newCameraPosition = HL.oldCameraPos.clone().add(oldCameraDirection.clone().multiplyScalar(diff));
	    var newCameraLookat = HL.oldCameraLookat.clone().add(oldCameraDirection.clone().multiplyScalar(diff));

	    parameters.cameraPosition = HL.util.vectorToString(newCameraPosition);
	    parameters.cameraLookat = HL.util.vectorToString(newCameraLookat);
	});
    domElement.addEventListener("mousemove", function(e) {
    	if (HL.mousedown) {
	        var coord = new THREE.Vector2(e.clientX, e.clientY);
		    var diff = coord.sub(HL.mouseClickPos);

		    var oldCameraDirection = HL.oldCameraLookat.clone().sub(HL.oldCameraPos).normalize();
		    var oldCameraUp = HL.oldCameraUp;
		    var oldCameraRight = oldCameraDirection.clone().applyAxisAngle(oldCameraUp, Math.PI/2);

		    var newCameraPosition = HL.oldCameraPos.clone();
		    var newCameraLookat = HL.oldCameraLookat.clone();

		    if (HL.mouseButton == "left") {
		    	diff.multiplyScalar(1/40);

			    newCameraPosition.add(oldCameraRight.clone().multiplyScalar(diff.x))
			    newCameraLookat.add(oldCameraRight.clone().multiplyScalar(diff.x))

			    newCameraPosition.add(oldCameraUp.clone().multiplyScalar(diff.y))
			    newCameraLookat.add(oldCameraUp.clone().multiplyScalar(diff.y))
		    } else if (HL.mouseButton == "right") {
		    	diff.multiplyScalar(1/1000);

		    	HL.util.rotatePointAroundOriginAxisAngle(newCameraLookat, HL.oldCameraPos, oldCameraUp, diff.x);
		    	HL.util.rotatePointAroundOriginAxisAngle(newCameraLookat, HL.oldCameraPos, oldCameraRight, -diff.y);
		    }

		    parameters.cameraPosition = HL.util.vectorToString(newCameraPosition);
		    parameters.cameraLookat = HL.util.vectorToString(newCameraLookat);
    	}
	});
}

HL.util.randomPointOnCircle = function(origin, radius, axis, seed) { // TODO: Does not seem to take origin into account
	if (axis == undefined || axis.constructor != THREE.Vector3) {
		seed = axis;
		axis = new THREE.Vector3(0, 1, 0);
	}

	var angle = HL.util.randomFloat(0, Math.PI*2, seed);
	var point = new THREE.Vector3(radius, 0, 0);
	return point.applyAxisAngle(axis, angle);
}

HL.util.randomPointOnSphere = function(origin, radius, seed) {
	var axis = new THREE.Vector3(HL.util.randomFloat(-1, 1, seed), HL.util.randomFloat(-1, 1, seed), HL.util.randomFloat(-1, 1, seed)).normalize();
	return HL.util.randomPointOnCircle(origin, radius, axis);
}

HL.util.randomPointInsideSphere = function(origin, radius, seed) {
	var position = new THREE.Vector3(HL.util.randomFloat(-1, 1, seed), HL.util.randomFloat(-1, 1, seed), HL.util.randomFloat(-1, 1, seed));
	if (position.length() > 1.0) position.multiplyScalar(HL.util.randomFloat(0.4, 0.9));
	if (position.length() > 1.0) position.normalize();
	position.multiplyScalar(radius);
	return position.add(origin);
}

HL.util.randomPointInsideCircle = function(origin, radius, seed) {
	var position = new THREE.Vector2(HL.util.randomFloat(-1, 1, seed), HL.util.randomFloat(-1, 1, seed));
	if (position.length() > 1.0) position.multiplyScalar(HL.util.randomFloat(0.4, 0.9));
	if (position.length() > 1.0) position.normalize();
	position.multiplyScalar(radius);
	return position.add(origin);
}

HL.util.setHTMLElementPosition = function(element, position3D, camera) {
	var coord2dNormalized = position3D.clone().project(camera);
	coord2dNormalized.y *= -1;
	var coord2dNormalizedAbsolute = coord2dNormalized.add(new THREE.Vector3(1, 1, 1)).multiplyScalar(1/2);
	var coord2dPercent = coord2dNormalizedAbsolute.multiplyScalar(100);
	element.style.position = "absolute";
	element.style.left = coord2dPercent.x.toFixed(3) + "%";
	element.style.top = coord2dPercent.y.toFixed(3) + "%";
}

HL.util.gridGeometry = function(xSegments, ySegments, xSize, ySize) {
	var geometry = new THREE.BufferGeometry();

	var positions = new Float32Array(xSegments * xSegments * 3);
	var seaDimensions = new THREE.Vector2(xSize, ySize);
	
	var indices_array = [];

	for (var y = 0; y < ySegments; y++) {
		for (var x = 0; x < xSegments; x++) {
			var particleX = -seaDimensions.x/2 + (x + 0.5)/xSegments * seaDimensions.x;
			var particleY = 0;
			var particleZ = -seaDimensions.y/2 + (y + 0.5)/ySegments * seaDimensions.y;

			var i = y * xSegments + x;
			var iLeft = i - 1;
			var iAbove = (y-1) * xSegments + x;

			if (x > 0) indices_array.push(iLeft, i);
			if (y > 0) indices_array.push(iAbove, i);

			positions[i*3 + 0] = particleX;
			positions[i*3 + 1] = particleY;
			positions[i*3 + 2] = particleZ;
		}
	}

	geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices_array), 1));
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	geometry.computeBoundingSphere();

	return geometry;
}

HL.util.addAndRemoveClass = function(removeFromSelector, addToSelector, classname) {
	document.querySelectorAll(removeFromSelector).forEach(function(element) {
		element.classList.add(classname);
	});

	document.querySelectorAll(addToSelector).forEach(function(element) {
		element.classList.remove(classname);
	});
}