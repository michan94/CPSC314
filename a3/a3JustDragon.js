/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2019
//  Assignment 3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('hello world');

a=5;  
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

var animation = true;
var meshesLoaded = false;

var myboxMotion = new Motion(myboxSetMatrices);     
var dragonMotion = new Motion(dragonSetMatrices);     
var dragon1, dragon2, dragon3, dragon4, dragon5, dragon6, dragon7, dragon8, dragon9, dragon10, dragon11, dragon12, dragon13;
var dragonFrame1, dragonFrame2, dragonFrame3, dragonFrame4, dragonFrame5, dragonFrame6, dragonFrame7, dragonFrame8, dragonFrame9, dragonFrame10, dragonFrame11, dragonFrame12, dragonFrame13;
var meshes = {};  
var RESOURCES_LOADED = false;

// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xd0f0d0);     // set background colour
canvas.appendChild(renderer.domElement);

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
    // set up M_proj    (internally:  camera.projectionMatrix )
    var cameraFov = 30;     // initial camera vertical field of view, in degrees
      // view angle, aspect ratio, near, far
    camera = new THREE.PerspectiveCamera(cameraFov,1,0.1,1000); 

    var width = 10;  var height = 5;
//    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );

    // set up M_view:   (internally:  camera.matrixWorldInverse )
    camera.position.set(0,12,20);
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(0,0,0);
    scene.add(camera);

      // SETUP ORBIT CONTROLS OF THE CAMERA
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////////////	
// init():  setup up 
////////////////////////////////////////////////////////////////////////	

function init() {
    console.log('init called');

    initCamera();
    initMotions();
    initLights();
    initObjects();
    initdragon();
    initFileObjects();

    window.addEventListener('resize',resize);
    resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() {

      // keyframes for the mybox animated motion:   name, time, [x, y, z]
    myboxMotion.addKeyFrame(new Keyframe('rest pose',0.0, [0,0,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',1.0, [0,0,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',2.0, [0,0,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',3.0, [0,0,0]));
      // basic interpolation test
    myboxMotion.currTime = 0.1;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=0.1
    myboxMotion.currTime = 2.9;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=2.9

      // keyframes for dragon:    name, time, [x, y, theta1, theta2, theta3, theta4, theta5]
    dragonMotion.addKeyFrame(new Keyframe('straight',         0.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('right finger curl',1.0, [-4, 5,   0, 0, -90, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         2.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('left finger curl', 3.0, [-4, 3,   0, -90, 0, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         4.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('both fingers curl', 5.0, [-4, 3,   0, 0, -45, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         6.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         7.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('right finger curl',8.0, [-4, 5,   0, 0, -90, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         9.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('left finger curl', 10.0, [-4, 3,   0, -90, 0, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         11.0, [-4, 3,    0, 0, 0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('both fingers curl', 12.0, [-4, 3,   0, -90, -90, 0,0]));
    dragonMotion.addKeyFrame(new Keyframe('straight',         13.0, [-4, 3,    0, 0, 0, 0, 0]));
}

///////////////////////////////////////////////////////////////////////////////////////
// myboxSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function myboxSetMatrices(avars) {
    mybox.matrixAutoUpdate = false;     // tell three.js not to over-write our updates
    mybox.matrix.identity();              
    mybox.matrix.multiply(new THREE.Matrix4().makeTranslation(avars[0], avars[1], avars[2]));  
    mybox.matrix.multiply(new THREE.Matrix4().makeRotationY(-Math.PI/2));
    mybox.matrix.multiply(new THREE.Matrix4().makeScale(1.0,1.0,1.0));
    mybox.updateMatrixWorld();  
}

///////////////////////////////////////////////////////////////////////////////////////
// dragonSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function dragonSetMatrices(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;
    var theta5 = avars[6]*deg2rad;


	//Dragon Head
    dragonFrame9.matrix.identity(); 
    dragonFrame9.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition+5,7,0));   
    dragonFrame9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));    
      // Frame 1 has been established
    dragon9.matrix.copy(dragonFrame9.matrix);
    dragon9.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0)); 
    dragon9.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1));

	//Dragon Neck
    dragonFrame6.matrix.identity(); 
    dragonFrame6.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition+5,3,0));   
    dragonFrame6.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/4));    
      // Frame 1 has been established
    dragon6.matrix.copy(dragonFrame6.matrix);
    dragon6.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0)); 
    dragon6.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1));
    
      ////////////// Dragon Body Front
    dragonFrame1.matrix.identity(); 
    dragonFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition+2,5,0));   
    dragonFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));    
      // Frame 1 has been established
    dragon1.matrix.copy(dragonFrame1.matrix);
    dragon1.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0)); 
    dragon1.matrix.multiply(new THREE.Matrix4().makeScale(3,1,1)); 
    
    ////////////// Dragon Body Mid
    dragonFrame12.matrix.identity(); 
    dragonFrame12.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,5,0));   
    dragonFrame12.matrix.multiply(new THREE.Matrix4().makeRotationZ(-Math.PI/5));    
      // Frame 1 has been established
    dragon12.matrix.copy(dragonFrame12.matrix);
    dragon12.matrix.multiply(new THREE.Matrix4().makeTranslation(3,3,0)); 
    dragon12.matrix.multiply(new THREE.Matrix4().makeScale(3,1,1));
    
    
    ////////////// Dragon Body Back
    dragonFrame13.matrix.identity(); 
    dragonFrame13.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,5,0));   
    dragonFrame13.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/6));    
      // Frame 1 has been established
    dragon13.matrix.copy(dragonFrame13.matrix);
    dragon13.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0)); 
    dragon13.matrix.multiply(new THREE.Matrix4().makeScale(3,1,1));     

      ////////////// Right Arm
    dragonFrame2.matrix.copy(dragonFrame1.matrix);      // start with parent frame
    dragonFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(5.5,0,1));
    dragonFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(-Math.PI/8));    
      // Frame 2 has been established
    dragon2.matrix.copy(dragonFrame2.matrix);
    dragon2.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    dragon2.matrix.multiply(new THREE.Matrix4().makeScale(2,1,0.5));    

      ///////////////  Right Hand
    dragonFrame3.matrix.copy(dragonFrame2.matrix);
    dragonFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(2,-0.5,0));
    dragonFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/8));    
      // Frame 3 has been established
    dragon3.matrix.copy(dragonFrame3.matrix);
    dragon3.matrix.multiply(new THREE.Matrix4().makeTranslation(1.5,-0.5,0));   
    dragon3.matrix.multiply(new THREE.Matrix4().makeScale(1,0.25,1));    

      /////////////// Left Arm
    dragonFrame4.matrix.copy(dragonFrame1.matrix);
    dragonFrame4.matrix.multiply(new THREE.Matrix4().makeTranslation(5.5,0,-1));
    dragonFrame4.matrix.multiply(new THREE.Matrix4().makeRotationZ(-Math.PI/8));    
      // Frame 4 has been established
    dragon4.matrix.copy(dragonFrame4.matrix);
    dragon4.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    dragon4.matrix.multiply(new THREE.Matrix4().makeScale(2,1,0.5));    

      // Left Hand
    dragonFrame5.matrix.copy(dragonFrame4.matrix);
    dragonFrame5.matrix.multiply(new THREE.Matrix4().makeTranslation(2,-0.5,0));
    dragonFrame5.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/8));    
      // Frame 5 has been established
    dragon5.matrix.copy(dragonFrame5.matrix);
    dragon5.matrix.multiply(new THREE.Matrix4().makeTranslation(1.5,-0.5,0));   
    dragon5.matrix.multiply(new THREE.Matrix4().makeScale(1,0.25,1));  
    
    ////////////// Right Leg
    dragonFrame7.matrix.copy(dragonFrame1.matrix);      // start with parent frame
    dragonFrame7.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,1));
    dragonFrame7.matrix.multiply(new THREE.Matrix4().makeRotationZ(7*Math.PI/6));    
      // Frame 7 has been established
    dragon7.matrix.copy(dragonFrame7.matrix);
    dragon7.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,1,0));   
    dragon7.matrix.multiply(new THREE.Matrix4().makeScale(2,1,0.25));   
    
    ////////////// Left Leg
    dragonFrame8.matrix.copy(dragonFrame1.matrix);      // start with parent frame
    dragonFrame8.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,-1));
    dragonFrame8.matrix.multiply(new THREE.Matrix4().makeRotationZ(7*Math.PI/6));    
      // Frame 8 has been established
    dragon8.matrix.copy(dragonFrame8.matrix);
    dragon8.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,1,0));   
    dragon8.matrix.multiply(new THREE.Matrix4().makeScale(2,1,0.25));
    
    // Right Foot
    dragonFrame10.matrix.copy(dragonFrame4.matrix);
    dragonFrame10.matrix.multiply(new THREE.Matrix4().makeTranslation(2,-0.5,0));
    dragonFrame10.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/8));    
      // Frame 10 has been established
    dragon10.matrix.copy(dragonFrame10.matrix);
    dragon10.matrix.multiply(new THREE.Matrix4().makeTranslation(1.5,-0.5,0));   
    dragon10.matrix.multiply(new THREE.Matrix4().makeScale(1,0.25,1));  
    
    // Left Foot
    dragonFrame11.matrix.copy(dragonFrame4.matrix);
    dragonFrame11.matrix.multiply(new THREE.Matrix4().makeTranslation(2,-0.5,0));
    dragonFrame11.matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/8));    
      // Frame 5 has been established
    dragon11.matrix.copy(dragonFrame5.matrix);
    dragon11.matrix.multiply(new THREE.Matrix4().makeTranslation(1.5,-0.5,0));   
    dragon11.matrix.multiply(new THREE.Matrix4().makeScale(1,0.25,1));       




    dragon1.updateMatrixWorld();
    dragon2.updateMatrixWorld();
    dragon3.updateMatrixWorld();
    dragon4.updateMatrixWorld();
    dragon5.updateMatrixWorld();
    dragon6.updateMatrixWorld();
    dragon7.updateMatrixWorld();
    dragon8.updateMatrixWorld();
    dragon9.updateMatrixWorld();
    dragon10.updateMatrixWorld();
    dragon11.updateMatrixWorld();
    dragon12.updateMatrixWorld();
    dragon13.updateMatrixWorld();

    dragonFrame1.updateMatrixWorld();
    dragonFrame2.updateMatrixWorld();
    dragonFrame3.updateMatrixWorld();
    dragonFrame4.updateMatrixWorld();
    dragonFrame5.updateMatrixWorld();
    dragonFrame6.updateMatrixWorld();
    dragonFrame7.updateMatrixWorld();
    dragonFrame8.updateMatrixWorld();
    dragonFrame9.updateMatrixWorld();
    dragonFrame10.updateMatrixWorld();
    dragonFrame11.updateMatrixWorld();
    dragonFrame12.updateMatrixWorld();
    dragonFrame13.updateMatrixWorld();
}

/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,4,2);
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
}

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );


/////////////////////////////////////	
// initObjects():  setup objects in the scene
/////////////////////////////////////	

function initObjects() {
    worldFrame = new THREE.AxesHelper(5) ;
    scene.add(worldFrame);

    // mybox 
    myboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    mybox = new THREE.Mesh( myboxGeometry, diffuseMaterial );
    scene.add( mybox );

    // textured floor
    floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1.1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);


}

/////////////////////////////////////////////////////////////////////////////////////
//  initdragon():  define all geometry associated with the dragon
/////////////////////////////////////////////////////////////////////////////////////

function initdragon() {
    dragonMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    skinMaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth

    dragon1 = new THREE.Mesh( boxGeometry, skinMaterial );  scene.add( dragon1 );
    dragonFrame1   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame1);
    dragon2 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon2 );
    dragonFrame2   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame2);
    dragon3 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon3 );
    dragonFrame3   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame3);
    dragon4 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon4 );
    dragonFrame4   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame4);
    dragon5 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon5 );
    dragonFrame5   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame5);
    dragon6 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon6 );
    dragonFrame6   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame6);
    dragon7 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon7 );
    dragonFrame7   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame7);
    dragon8 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon8 );
    dragonFrame8   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame8);
    dragon9 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon9 );
    dragonFrame9   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame9);
    dragon10 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon10 );
    dragonFrame10   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame10);
    dragon11 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon11 );
    dragonFrame11   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame11);
    dragon12 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon12 );
    dragonFrame12   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame12);
    dragon12 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon12 );
    dragonFrame12   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame12);
    dragon13 = new THREE.Mesh( boxGeometry, dragonMaterial );  scene.add( dragon13 );
    dragonFrame13   = new THREE.AxesHelper(1) ;   scene.add(dragonFrame13);
    
    dragon1.matrixAutoUpdate = false;  
    dragon2.matrixAutoUpdate = false;  
    dragon3.matrixAutoUpdate = false;  
    dragon4.matrixAutoUpdate = false;  
    dragon5.matrixAutoUpdate = false;
    dragon6.matrixAutoUpdate = false;
    dragon7.matrixAutoUpdate = false;
    dragon8.matrixAutoUpdate = false;
    dragon9.matrixAutoUpdate = false;
    dragon10.matrixAutoUpdate = false;
    dragon11.matrixAutoUpdate = false;
    dragon12.matrixAutoUpdate = false;
    dragon13.matrixAutoUpdate = false;
    
    dragonFrame1.matrixAutoUpdate = false;  
    dragonFrame2.matrixAutoUpdate = false;  
    dragonFrame3.matrixAutoUpdate = false;  
    dragonFrame4.matrixAutoUpdate = false;  
    dragonFrame5.matrixAutoUpdate = false;
    dragonFrame6.matrixAutoUpdate = false;
    dragonFrame7.matrixAutoUpdate = false;  
    dragonFrame8.matrixAutoUpdate = false;
    dragonFrame9.matrixAutoUpdate = false;
    dragonFrame10.matrixAutoUpdate = false;  
    dragonFrame11.matrixAutoUpdate = false;
    dragonFrame12.matrixAutoUpdate = false;
    dragonFrame13.matrixAutoUpdate = false;
}

/////////////////////////////////////////////////////////////////////////////////////
//  initD():  define all geometry associated with the dragon
/////////////////////////////////////////////////////////////////////////////////////

// function initD() {
// 	dMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff7f} );

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

function initFileObjects() {
        // list of OBJ files that we want to load, and their material
    models = {     
//	bunny:     {obj:"obj/bunny.obj", mtl: diffuseMaterial, mesh: null},
//	horse:     {obj:"obj/horse.obj", mtl: diffuseMaterial, mesh: null },
//	minicooper:{obj:"obj/minicooper.obj", mtl: diffuseMaterial, mesh: null },
//	trex:      { obj:"obj/trex.obj", mtl: normalShaderMaterial, mesh: null },
	teapot:    {obj:"obj/teapot.obj", mtl: customShaderMaterial, mesh: null	},
	armadillo: {obj:"obj/armadillo.obj", mtl: customShaderMaterial, mesh: null },
	dragon:    {obj:"obj/dragon.obj", mtl: customShaderMaterial, mesh: null }
    };

    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
	onResourcesLoaded();
    }
    var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
	    var percentComplete = xhr.loaded / xhr.total * 100;
	    console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
    };
    var onError = function ( xhr ) {
    };

    // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
    for( var _key in models ){
	console.log('Key:', _key);
	(function(key){
	    var objLoader = new THREE.OBJLoader( manager );
	    objLoader.load( models[key].obj, function ( object ) {
		object.traverse( function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
			child.material = models[key].mtl;
			child.material.shading = THREE.SmoothShading;
		    }	} );
		models[key].mesh = object;
//		scene.add( object );
	    }, onProgress, onError );
	})(_key);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded(){
	
 // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
 //                             i.e., creates references to the geometry, and not full copies ]
    meshes["armadillo1"] = models.armadillo.mesh.clone();
    
    // position the object instances and parent them to the scene, i.e., WCS
    
    meshes["armadillo1"].position.set(-50, 1.5, 2);
    meshes["armadillo1"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo1"].scale.set(1,1,1);
    scene.add(meshes["armadillo1"]);

    meshesLoaded = true;
}


///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) 
    light.position.y += 0.1;
  else if (keyboard.pressed("S")) 
    light.position.y -= 0.1;
  else if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;
  else if (keyboard.pressed(" "))
    animation = !animation;
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    var dt=0.02;
    checkKeyboard();
    if (animation && meshesLoaded) {
	  // advance the motion of all the animated objects
	myboxMotion.timestep(dt);
	dragonMotion.timestep(dt);
    }

    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}

init();
update();

