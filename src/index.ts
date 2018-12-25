import * as THREE from 'three';
import { scene, renderer, camera } from './3d';
import { Sphere } from './physical/sphere.class';

const SPEED = 0.1;

const sphere1 = new Sphere(3, {Vx: 1, Vy: 1, Vz: 1});

var geometry = new THREE.SphereGeometry(sphere1.radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshNormalMaterial();
var sphere1Mesh = new THREE.Mesh( geometry, material );
sphere1Mesh.position.set(0, 0, 0);

scene.add( sphere1Mesh );
drawLines();

var render = function () {
  requestAnimationFrame(render);

  // sphere.rotation.y += 0.01;

  // sphere1Mesh.

  const position = sphere1Mesh.position;
  sphere1Mesh.position.set(position.x + SPEED, position.y + SPEED, position.z + SPEED);
  
  renderer.render(scene, camera);
};

render();

function drawLines() {
  scene.add(
    getLine(10, 0, 0),
    getLine(0, 10, 0),
    getLine(0, 0, 10),
  );
}

function getLine(...coords) {
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( ...coords ) );
  return new THREE.Line( geometry, material );
}
