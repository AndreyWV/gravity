import * as THREE from 'three';
import { scene } from './scene';
import { camera } from './camera';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render( scene, camera );

export { renderer };