import * as THREE from 'three';
import { scene, renderer, camera } from './3d';
import { drawCoordinateSystem } from './helpers';
import { Sphere3d } from './3d/sphere3d';

drawCoordinateSystem(scene);

const staticSphere = new Sphere3d(1, {X: 0, Y: 0, Z: 0}, {X: 50, Y: 0, Z: 0});
const movedSphere = new Sphere3d(1, {X: 0.03, Y: 0.005, Z: 0}, {X: 0, Y: 0, Z: 0});
scene.add( staticSphere.mesh, movedSphere.mesh );

var render = function () {
  requestAnimationFrame(render);

  const position = movedSphere.mesh.position;
  // updateSpeed();
  movedSphere.mesh.position.set(
    position.x + movedSphere.V.X,
    position.y + movedSphere.V.Y, 
    position.z + movedSphere.V.Z
  );
  
  renderer.render(scene, camera);
};

render();

// function createSphere(sphere: Sphere): THREE.Mesh {
//   const geometry = new THREE.SphereGeometry(sphere.radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
//   const material = new THREE.MeshNormalMaterial();
//   const mesh = new THREE.Mesh( geometry, material );
//   return mesh;
// }

// function updateSpeed() {
//   const force = movedSphere.F;


// }

function calculateDistance(body1: THREE.Mesh, body2: THREE.Mesh): number {
  const distance = Math.sqrt(
    Math.pow(body1.position.x + body2.position.x, 2) +
    Math.pow(body1.position.y + body2.position.y, 2) +
    Math.pow(body1.position.z + body2.position.z, 2)
  );
  return distance;
}