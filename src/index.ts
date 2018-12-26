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

// function updateSpeed() {
//   const force = movedSphere.F;


// }