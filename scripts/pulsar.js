var stats, camera, scene, renderer;
var geometry, points = [];

var windowHalfX = window.innerWidth  / 2;
var windowHalfY = window.innerHeight / 2;

var SEPARATION     = 20;
var AMOUNTX        = 30;
var AMOUNTY        = 30;
var INITIAL_FACTOR = 1.0;
var WAVE_HEIGHT    = 100;
var WAVE_SPEED     = 0.2;
var ROTATION_SPEED = 0.1;
var DAMP_SPEED     = 0.005;
var CAMERA_SPEED   = 0.04;

var rotation = 0;
var factor   = INITIAL_FACTOR;
var mouseX   = -150;
var mouseY   = -150;
var initial_camera_zpos = 500;
var initial_camera_ypos = 500;

init();
animate();

function init() {
  var container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = initial_camera_zpos;
  camera.position.y = initial_camera_ypos;

  scene = new THREE.Scene();

  var width  = SEPARATION * AMOUNTX;
  var height = SEPARATION * AMOUNTY;

  geometry = new THREE.PlaneGeometry(width, height, AMOUNTX, AMOUNTY);
  var ground = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( {  wireframe: true, wireframeLinecap: 'square' } ) );


  calculateInitialPoints();
  updatePoints();

  ground.rotation.x = Math.PI / -2;
  scene.add(ground);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function calculateInitialPoints() {
  for(var i = 0; i < geometry.vertices.length; i++) {
    var v = geometry.vertices[i];
    var x = (v.x / SEPARATION) * WAVE_SPEED;
    var y = (v.y / SEPARATION) * WAVE_SPEED;
    points[i] = WAVE_HEIGHT * (Math.cos(x*x + y*y) / Math.sqrt(x*x + y*y + 0.25));
  }
}

function updatePoints() {
  for(var i = 0; i < geometry.vertices.length; i++) {
    var v = geometry.vertices[i];
    v.z = points[i] * Math.cos(rotation) * factor;
  }
}

function calculateNextParameters() {
  rotation += ROTATION_SPEED;
  if(factor > 0) {
    factor -= DAMP_SPEED;
  }
}

function onWindowResize() {
  windowHalfX = window.innerWidth  / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function shakingmama(event) {
  factor = INITIAL_FACTOR;
}

/*
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
*/

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  camera.position.x += ( mouseX - camera.position.x) * CAMERA_SPEED;
  camera.position.y += (-mouseY - camera.position.y) * CAMERA_SPEED;
  camera.lookAt(scene.position);

  updatePoints();
  renderer.render(scene, camera);
  calculateNextParameters();
}

window.onload = function() {
  var gui = new dat.GUI();
  gui.add( camera.position , 'x', -500, 500 ).step(5)
  gui.add( camera.position , 'z', -500, 500 ).step(5)
  gui.add( window, 'shakingmama');

};