import { scene, renderer, camera } from './3d';
import { drawCoordinateSystem } from './helpers';
import { Sphere3d } from './3d/sphere3d';
import { RectSystemValue } from './physical';

drawCoordinateSystem(scene);

const sceneItems: Sphere3d[] = [
  // new Sphere3d(5, {X: 0, Y: 0, Z: 0}, {X: 50, Y: 0, Z: 0}),
  // new Sphere3d(0.1, {X: 0.2, Y: 0.2, Z: 0}, {X: 0, Y: 0, Z: 0}),
]

for (var i = 0; i < 50; i++) {
  sceneItems.push(new Sphere3d(1, undefined, {X: getRandom(), Y: getRandom(), Z: getRandom()}))
}

sceneItems.forEach(item => scene.add(item.mesh));

var render = function () {
  requestAnimationFrame(render);

  const speedDeltas: RectSystemValue[] = sceneItems.map(
    item => {
      const result: RectSystemValue = {X: 0, Y:0, Z: 0};
      sceneItems.forEach(otherItem => {
        const delta = item.calculateSpeedDelta(otherItem);
        result.X += delta.X;
        result.Y += delta.Y;
        result.Z += delta.Z;
      });
      return result;
    }
  );

  sceneItems.forEach((item, index) => {
    item.V = {
      X: item.V.X + speedDeltas[index].X,
      Y: item.V.Y + speedDeltas[index].Y,
      Z: item.V.Z + speedDeltas[index].Z,
    }
  });

  sceneItems.forEach((item, index) => {
    item.mesh.position.set(
      item.mesh.position.x + item.V.X,
      item.mesh.position.y + item.V.Y,
      item.mesh.position.z + item.V.Z,
    );
  });
  
  renderer.render(scene, camera);
};

render();

function getRandom() {
  return Math.round(Math.random() * 1000);
}