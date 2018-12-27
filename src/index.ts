import { scene, renderer, camera } from './3d';
import { drawCoordinateSystem } from './helpers';
import { Sphere3d } from './3d/sphere3d';

drawCoordinateSystem(scene);

const items: Sphere3d[] = [
  new Sphere3d(1, {X: 0, Y: 0, Z: 0}, {X: 50, Y: 0, Z: 0}),
  new Sphere3d(1, {X: 0.03, Y: 0.005, Z: 0}, {X: 0, Y: 0, Z: 0}),
]

items.forEach(item => scene.add(item.mesh));

var render = function () {
  requestAnimationFrame(render);

  items.forEach(item => {
    item.mesh.position.set(
      item.mesh.position.x + item.V.X,
      item.mesh.position.y + item.V.Y,
      item.mesh.position.z + item.V.Z,
    );
  });
  
  renderer.render(scene, camera);
};

render();