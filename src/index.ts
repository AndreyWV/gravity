import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
import { PhysicalBody } from './physical-body.class';
import { createScene } from './scene';

// const testPart = new PhysicalBody(1);

const { scene, camera, renderer } = createScene();

    
var geometry = new THREE.SphereGeometry(1, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh( geometry, material );
initControls();

scene.add( sphere );
drawLines();

var render = function () {
  requestAnimationFrame(render);

  sphere.rotation.y += 0.01;
  
  renderer.render(scene, camera);
};

render();

function drawLines() {
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
  geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
  var line = new THREE.Line( geometry, material );
  scene.add( line );
}

function initControls() {
  const CONTROLS = new OrbitControls(camera);
  CONTROLS.minPolarAngle = Math.PI * 1 / 4;
  CONTROLS.maxPolarAngle = Math.PI * 3 / 4;
  CONTROLS.minDistance = 1;
  CONTROLS.maxDistance = 100000;
  // CONTROLS.autoRotate = true;
  // CONTROLS.autoRotateSpeed = -1.0;
  CONTROLS.update();

  // const MOUSE = new THREE.Vector2();
}
