import { scene, renderer, camera } from './3d';
import { drawCoordinateSystem } from './helpers';
import { Sphere3d } from './3d/sphere3d';
import { RectSystemValue } from './physical';

drawCoordinateSystem(scene);

const sceneItems: Sphere3d[] = [
  new Sphere3d(5, {X: 0, Y: 0, Z: 0}, {X: 50, Y: 0, Z: 0}),
  new Sphere3d(0.1, {X: 0.05, Y: 0, Z: 0}, {X: 0, Y: 0, Z: 0}),
]

// for (var i = 0; i < 50; i++) {
//   sceneItems.push(new Sphere3d(1, undefined, {X: getRandom(), Y: getRandom(), Z: getRandom()}))
// }

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
    };

    item.mesh.position.set(
      item.mesh.position.x + item.V.X,
      item.mesh.position.y + item.V.Y,
      item.mesh.position.z + item.V.Z,
    );
  });

  // sceneItems.forEach(item => {
  //   sceneItems.forEach(otherItem => {
  //     if (Sphere3d.isCollision(item, otherItem)) {
  //       console.log(1);
  //     }
  //   });
  // });
  
  renderer.render(scene, camera);
};

render();

function getRandom() {
  return Math.round(Math.random() * 1000);
}
setInterval(() => {
  const collisions: Sphere3d[][] = [];
  sceneItems.forEach(item => {
    sceneItems.forEach(otherItem => {
      if (Sphere3d.isCollision(item, otherItem)) {
        console.log(1);
        if (!isItemInCollision(collisions, item)) {
          collisions.push([item, otherItem]);
        }
      }
    });
  });
  processCollisions(collisions);

}, 100);

function isItemInCollision(collisions: Sphere3d[][], item: Sphere3d): boolean {
  const finded = collisions.find(collisionItem => collisionItem[1] === item);
  console.log(finded);
  return Boolean(finded);
}

function processCollisions(collisions: Sphere3d[][]): void {
  if (!collisions.length) {
    return;
  }
  collisions.forEach(collision => { processCollision(collision[0], collision[1]); })
}

function processCollision(item1: Sphere3d, item2: Sphere3d): void {
  scene.remove(item1.mesh);
  scene.remove(item2.mesh);

  const newItem = new Sphere3d(
    item1.mass + item2.mass,
    {
      X: item1.V.X + item2.V.X,
      Y: item1.V.Y + item2.V.Y,
      Z: item1.V.Z + item2.V.Z,
    },
    {
      X: Math.abs(item1.mesh.position.x - item2.mesh.position.x),
      Y: Math.abs(item1.mesh.position.y - item2.mesh.position.y),
      Z: Math.abs(item1.mesh.position.z - item2.mesh.position.z),
    }
  );

  sceneItems.push(newItem);
  scene.add(newItem.mesh);
}