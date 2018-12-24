import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(-10, -10, -10);
  camera.lookAt( new THREE.Vector3(0, 0, 0) );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  return { scene, camera, renderer};
}

