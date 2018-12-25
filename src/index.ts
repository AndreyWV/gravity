import * as THREE from 'three';
import { scene, renderer, camera } from './3d';
import { Sphere } from './physical/sphere.class';
import { drawCoordinateSystem } from './helpers';

drawCoordinateSystem(scene);

const staticSphere = new Sphere(1, {X: 0, Y: 0, Z: 0});
const staticSphereMesh = createSphere(staticSphere);
const movedSphere = new Sphere(1, {X: 0.03, Y: 0.005, Z: 0});
const movedSphereMesh = createSphere(movedSphere);
staticSphereMesh.position.set(50, 0, 0);
movedSphereMesh.position.set(0, 0, 0);
scene.add( staticSphereMesh, movedSphereMesh );

var render = function () {
  requestAnimationFrame(render);

  const position = movedSphereMesh.position;
  movedSphereMesh.position.set(
    position.x + movedSphere.V.X,
    position.y + movedSphere.V.Y, 
    position.z + movedSphere.V.Z
  );
  
  renderer.render(scene, camera);
};

render();

function createSphere(sphere: Sphere): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(sphere.radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh( geometry, material );
  return mesh;
}