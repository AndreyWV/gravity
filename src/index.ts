import * as THREE from 'three';
import { initExtensions } from './extensions';
initExtensions();
import { scene, renderer, camera, cssRenderer, cssScene } from './3d';
import { drawCoordinateSystem, round } from './helpers';
import { Sphere3d } from './3d/sphere3d';
import { RectSystemValue } from './physical';

drawCoordinateSystem(scene);

const sceneItems: Sphere3d[] = [
  new Sphere3d(5, {X: 0, Y: 0, Z: 0}, {X: 0, Y: 0, Z: 0}),
  // new Sphere3d(0.1, {X: 0.05, Y: 0, Z: 0}, {X: 0, Y: 0, Z: 0}),
]

// for (var i = 0; i < 20; i++) {
//   sceneItems.push(new Sphere3d(1, undefined, {X: getRandom(), Y: getRandom(), Z: getRandom()}))
// }

sceneItems.forEach(item => {
  scene.add(item.mesh);
  cssScene.add(item.cssObject);
});

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

    item.cssObject.position.set(
      item.cssObject.position.x + item.V.X,
      item.cssObject.position.y + item.V.Y,
      item.cssObject.position.z + item.V.Z,
    )

    window.camera = camera;
    window.item = item;
    window.THREE = THREE;

    const cameraVector = camera.getWorldDirection(new THREE.Vector3());

    // item.cssObject.rotation.x = Math.atan(cameraVector.z / cameraVector.y) + Math.PI / 2;
    // item.cssObject.rotation.y = Math.atan(cameraVector.x / cameraVector.z);
  });

  let collisions: Sphere3d[][] = [];
  sceneItems.forEach(item => {
    sceneItems.forEach(otherItem => {
      if (Sphere3d.isCollision(item, otherItem)) {
        const collisionOfItem = collisions.find(collision => {
          return collision.includes(item) || collision.includes(otherItem);
        });
        if (collisionOfItem) {
          collisionOfItem.push(item);
          collisionOfItem.push(otherItem);
        } else {
          collisions.push([item, otherItem]);
        }
      }
    });
  });

  collisions = collisions.map(item => {
    return item.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  });

  processCollisions(collisions);
  
  renderer.render(scene, camera);
  cssRenderer.render(cssScene, camera);
};

render();

function getRandom() {
  const value = Math.round(Math.random() * 200);
  return value % 2 === 0 ? value : -value;
}

function processCollisions(collisions: Sphere3d[][]): void {
  if (!collisions.length) {
    return;
  }
  collisions.forEach(collision => { processCollision(collision); })
}

function processCollision(collision: Sphere3d[]): void {
  let resultMass: number = 0;
  let resultSpeed: RectSystemValue = {X: 0, Y: 0, Z: 0};
  let resultPosition: RectSystemValue = {X: 0, Y: 0, Z: 0};

  collision.forEach(item => {
    resultSpeed = {
      X: round(((resultSpeed.X * resultMass) + (item.V.X * item.mass)) / (resultMass + item.mass)),
      Y: round(((resultSpeed.Y * resultMass) + (item.V.Y * item.mass)) / (resultMass + item.mass)),
      Z: round(((resultSpeed.Z * resultMass) + (item.V.Z * item.mass)) / (resultMass + item.mass)),
    };

    if (resultMass < item.mass) {
      resultPosition = {
        X: item.mesh.position.x,
        Y: item.mesh.position.y,
        Z: item.mesh.position.z,
      };
    } else if (resultMass === item.mass) {
      resultPosition = {
        X: (resultPosition.X + item.mesh.position.x) / (resultPosition.X ? 2 : 1),
        Y: (resultPosition.Y + item.mesh.position.y) / (resultPosition.Y ? 2 : 1),
        Z: (resultPosition.Z + item.mesh.position.z) / (resultPosition.Z ? 2 : 1),
      }
    }

    resultMass += item.mass;

    scene.remove(item.mesh);
    cssScene.remove(item.cssObject);
    let index = sceneItems.indexOf(item);
    sceneItems.splice(index, 1);
  });

  const newItem = new Sphere3d(resultMass, resultSpeed, resultPosition);
  scene.add(newItem.mesh);
  cssScene.add(newItem.cssObject);
  sceneItems.push(newItem);
}