import * as THREE from 'three';
import { scene, cssScene } from './scene';
import { camera } from './camera';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

renderer.render( scene, camera );
cssRenderer.render( cssScene, camera );

export { renderer, cssRenderer };