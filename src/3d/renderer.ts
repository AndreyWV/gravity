import * as THREE from 'three';
import { scene } from './scene';
import { camera } from './camera';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(cssRenderer.domElement);

renderer.render( scene, camera );
cssRenderer.render( scene, camera );

export { renderer, cssRenderer };