/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2019, Assignment 1 
/////////////////////////////////////////////////////////////////////////////////////////
//Q1a
console.log('Assignment 1 (Mitchell Chan)')

//Q1f
a=4; b=5;
function go() {
var a = 14; b = 15; 
}
go(); 
console.log('a=',a,'b=',b);

a=5;  
b=2.6;
console.log('a=',a,'b=',b);
//Q1b
console.log(a/0);
//Q1c
//console.log("Nonexistent variable name: ", notreal);
//Q1d
var foo;
console.log(foo);

myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
  // set background colour to 0xRRGGBB  where RR,GG,BB are values in [00,ff] in hexadecimal, i.e., [0,255] 
renderer.setClearColor(0xB19CD9);     
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xFFA500, side: THREE.DoubleSide } );
var diffuseMaterial3 = new THREE.MeshLambertMaterial( {color: 0xFFFF00} );
var diffuseMaterial4 = new THREE.MeshLambertMaterial( {color: 0x0000FF} );
var diffuseMaterial5 = new THREE.MeshLambertMaterial( {color: 0xFFC0CB} );
var diffuseMaterialTorus = new THREE.MeshLambertMaterial( {color: 0xC0C0C0} );
//var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
var basicMaterial1 = new THREE.MeshBasicMaterial( {color: 0x77AAFF} ); //Orbiting sphere 
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );
var cageMaterial = new THREE.MeshPhongMaterial( {wireframe: true, color: 0xffffff} );
var diamondMaterial = new THREE.MeshPhongMaterial( {wireframe: true, color: 0x3fe73f} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////	
// WORLD COORDINATE FRAME
/////////////////////////////////////	

var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////	
// FLOOR with texture
/////////////////////////////////////	

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   cage encapsulating sphere 
///////////////////////////////////////////////////////////////////////

cageGeometry = new THREE.IcosahedronGeometry(0.5, 0);
cage = new THREE.Mesh(cageGeometry, cageMaterial);
cage.position.set(0,4,2)
cage.position.set(light.position.x, light.position.y, light.position.z);
scene.add(cage);


///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(0,4,2); //Initial position of sphere?
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   orbiting sphere 1
///////////////////////////////////////////////////////////////////////

sphereGeometry1 = new THREE.SphereGeometry(0.2, 15, 15);
sphere1 = new THREE.Mesh(sphereGeometry1, basicMaterial1);
sphere1.position.set(1,5,-3);
scene.add(sphere1);

///////////////////////////////////////////////////////////////////////
//   orbiting sphere 2
///////////////////////////////////////////////////////////////////////

sphereGeometry1 = new THREE.SphereGeometry(0.2, 15, 15);
sphere2 = new THREE.Mesh(sphereGeometry1, basicMaterial1);
sphere2.position.set(1,50,-3);
scene.add(sphere2);

///////////////////////////////////////////////////////////////////////
//   box beside mcc
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );

///////////////////////////////////////////////////////////////////////
//   stack box (bottom)
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box1 = new THREE.Mesh( boxGeometry, diffuseMaterial3 );
box1.position.set(-6, 0, 0);
scene.add( box1 );

///////////////////////////////////////////////////////////////////////
//   stack box (middle)
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box2 = new THREE.Mesh( boxGeometry, diffuseMaterial4 );
box2.position.set(-6, 1, 0);
box2.rotation.set(0,90,0);
scene.add( box2 );

///////////////////////////////////////////////////////////////////////
//   stack box (top)
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box3 = new THREE.Mesh( boxGeometry, diffuseMaterial5 );
box3.position.set(-6, 2, 0);
box3.rotation.set(0,180,0);
scene.add( box3 );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,0,0);
scene.add( mcc );	

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, new THREE.MeshLambertMaterial( {color: 0x10C7A7} ));
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, new THREE.MeshLambertMaterial( {color: 0x6910C7} ));
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterialTorus);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

/////////////////////////////////////////////////////////////////////////
// torus #2
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry2 = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus2 = new THREE.Mesh( torusGeometry2, diffuseMaterialTorus);
torus2.position.set(8, 0, 0);   // translation
torus2.rotation.set(300,0,0);     // rotation about x,y,z axes
scene.add( torus2 );

/////////////////////////////////////////////////////////////////////////
// torus #3 (Bottom)
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry3 = new THREE.TorusGeometry( 5, 1, 10, 20 );
torus3 = new THREE.Mesh( torusGeometry3, new THREE.MeshLambertMaterial( {color: 0x800000} ));
torus3.position.set(0, -5, 0);   // translation
torus3.rotation.set(300,0,0);     // rotation about x,y,z axes
scene.add( torus3 );

/*
/////////////////////////////////////////////////////////////////////////
// torus #4 (Top)
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torus4 = new THREE.Mesh( torusGeometry3, new THREE.MeshLambertMaterial( {color: 0xFFFFFF} ));
torus4.position.set(0, 5, 0);   // translation
torus4.rotation.set(300,0,0);     // rotation about x,y,z axes
scene.add( torus4 );
*/

/////////////////////////////////////
//  Dome
//////////////////////////////////

var domeGeometry = new THREE.SphereGeometry(3, 10, 10)
dome = new THREE.Mesh(domeGeometry, cageMaterial);
scene.add(dome);

/////////////////////////////////////
//  Diamond
//////////////////////////////////

var diamondGeometry = new THREE.SphereGeometry(0.5, 10, -40)
diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
diamond.position.set(light.position.x, light.position.y + 1.5, light.position.z);
scene.add(diamond);


/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,3,0);
var v3 = new THREE.Vector3(3,3,0);
var v4 = new THREE.Vector3(1.5, 1.5, 1.5) //Point of Pyramid

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );// Makes Upper Right half of base of pyramid
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );//Makes Lower left half of base of pyramid
geom.faces.push( new THREE.Face3( 4, 2, 0 ) );//Left face
geom.faces.push( new THREE.Face3( 4, 1, 3 ) );//Right face
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
scene.add(customObject);
/*
/////////////////////////////////////
//  CUSTOM OBJECT 1
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v5 = new THREE.Vector3(0,0,0);
var v6 = new THREE.Vector3(3,0,0);
var v7 = new THREE.Vector3(0,3,0);
var v8 = new THREE.Vector3(3,3,0);

geom.vertices.push(v5);
geom.vertices.push(v6);
geom.vertices.push(v7);
geom.vertices.push(v8);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
scene.add(customObject);

/////////////////////////////////////
//  CUSTOM OBJECT 2 (Right)
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v9 = new THREE.Vector3(0,0,0);
var v10 = new THREE.Vector3(3,0,0);
var v11 = new THREE.Vector3(0,3,0);
var v12 = new THREE.Vector3(3,3,0);

geom.vertices.push(v9);
geom.vertices.push(v10);
geom.vertices.push(v11);
geom.vertices.push(v12);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
scene.add(customObject);
*/
/////////////////////////////////////////////////////////////////////////////////////
//  create armadillo material
/////////////////////////////////////////////////////////////////////////////////////

var armadilloMaterial = new THREE.ShaderMaterial( {
//	uniforms: uniforms,
        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'myVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'myFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};
var onError = function ( xhr ) {
};
var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/armadillo.obj', function ( object ) {
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material = armadilloMaterial;
		}
	} );
	scene.add( object );
}, onProgress, onError );

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
	if (keyboard.pressed("W")) {
    	console.log('W pressed');
    	light.position.y += 0.1;
	} 
	else if (keyboard.pressed("S")) {
    	light.position.y -= 0.1;
	}
	if (keyboard.pressed("A")) {
		light.position.x -= 0.1;
    }
	else if (keyboard.pressed("D")) {
		light.position.x += 0.1;
    }
	if (light.position.x <= 5 && light.position.x >= -5 && light.position.y <= 5 
	&& light.position.y >= -5) {
		sphere.position.set(light.position.x, light.position.y, light.position.z);
		cage.position.set(light.position.x, light.position.y, cage.position.z);
		diamond.position.set(light.position.x, light.position.y + 1.5, cage.position.z);
	}
}



///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);
  
  var time = Date.now() * 0.0005;
  sphere1.position.x = Math.sin(time * 5) * 4;
  sphere1.position.y = Math.cos(time * 5) * 1;
  sphere1.position.z = Math.cos(time * 3) * 1;
  
  sphere2.position.x = Math.sin(time * 5) * -4;
  sphere2.position.y = Math.cos(time * 5) * -1;
  sphere2.position.z = Math.cos(time * 3) * -1;
  
  box1.rotation.x += 0.01;
  box1.rotation.y += 0.01;
  box1.rotation.z += 0.01;
  
  box2.rotation.x += 0.01;
  box2.rotation.y += -0.01;
  box2.rotation.z += 0.01;
  
  box3.rotation.x += 0.01;
  box3.rotation.y += 0.01;
  box3.rotation.z += 0.01;
  
  torus3.rotation.z += 0.02;
//  torus4.rotation.z -= 0.02;
  
  diamond.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus2.rotation.x += 0.01;
}

update();

