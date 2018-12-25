import * as THREE from 'three';
import { Scene } from 'three';

export function drawCoordinateSystem(scene: Scene) {
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
