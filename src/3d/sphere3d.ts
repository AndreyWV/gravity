import * as THREE from 'three';
import { Sphere, RectSystemValue } from '../physical';

export class Sphere3d extends Sphere {

  public mesh: THREE.Mesh;

  constructor(mass: number, speed?: RectSystemValue, coords?: RectSystemValue) {
    super(mass, speed);

    const sphere = this;
    const geometry = new THREE.SphereGeometry(sphere.radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.set(
      coords.X || 0,
      coords.Y || 0,
      coords.Z || 0,
    );
  }
}