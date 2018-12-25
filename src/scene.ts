import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.set(-100, -100, -100);
  camera.lookAt(scene.position);
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  return { scene, camera, renderer};
}

