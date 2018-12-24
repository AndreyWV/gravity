import * as THREE from 'three';
import { PhysicalBody } from './physical-body.class';
import { createScene } from './scene';

// const testPart = new PhysicalBody(1);

const { scene, camera, renderer } = createScene();

    
var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

var render = function () {
  requestAnimationFrame(render);

  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
};

render();