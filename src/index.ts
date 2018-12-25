import * as THREE from 'three';
import { scene, renderer, camera } from './3d';
import { Sphere } from './physical/sphere.class';
import { drawCoordinateSystem } from './helpers';

const sphere1 = new Sphere(3, {X: 0.05, Y: 0, Z: 0});

var geometry = new THREE.SphereGeometry(sphere1.radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshNormalMaterial();
var sphere1Mesh = new THREE.Mesh( geometry, material );
sphere1Mesh.position.set(0, 0, 0);

scene.add( sphere1Mesh );
drawCoordinateSystem(scene);

var render = function () {
  requestAnimationFrame(render);

  const position = sphere1Mesh.position;
  sphere1Mesh.position.set(position.x + sphere1.V.X, position.y + sphere1.V.Y, position.z + sphere1.V.Z);
  
  renderer.render(scene, camera);
};

render();