import { scene, renderer, camera } from './3d';
import { drawCoordinateSystem } from './helpers';
import { Sphere3d } from './3d/sphere3d';

drawCoordinateSystem(scene);

const sceneItems: Sphere3d[] = [
  new Sphere3d(1, {X: 0, Y: 0, Z: 0}, {X: 50, Y: 0, Z: 0}),
  new Sphere3d(1, {X: 0.03, Y: 0.005, Z: 0}, {X: 0, Y: 0, Z: 0}),
]

sceneItems.forEach(item => scene.add(item.mesh));

var render = function () {
  requestAnimationFrame(render);

  sceneItems.forEach(item => {
    item.mesh.position.set(
      item.mesh.position.x + item.V.X,
      item.mesh.position.y + item.V.Y,
      item.mesh.position.z + item.V.Z,
    );
  });
  
  renderer.render(scene, camera);
};

render();

setInterval(() => {
  const distance = Sphere3d.calculateDistance(sceneItems[0], sceneItems[1]);
  sceneItems[0].calculateSpeedDelta(sceneItems[1]);
  // console.log(Sphere3d.calculateGravitation(sceneItems[0], sceneItems[1], distance));
  // console.log(sceneItems[1].calculateSpeedDelta(sceneItems[0]));
}, 1000);