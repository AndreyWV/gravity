import * as THREE from 'three';
import { scene } from './scene';
const OrbitControls = require('three-orbit-controls')(THREE);

const camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 0.1, 1000000 );
camera.position.set(100000, 100000, 100000);
camera.lookAt(scene.position);

const controls = new OrbitControls(camera);
controls.minPolarAngle = Math.PI * 1 / 4;
controls.maxPolarAngle = Math.PI * 3 / 4;
controls.minDistance = 1;
controls.maxDistance = 1000000;
// controls.autoRotate = true;
// controls.autoRotateSpeed = -1.0;
controls.update();

export { camera };