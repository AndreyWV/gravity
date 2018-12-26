import * as THREE from 'three';
import { Sphere, RectSystemValue } from '../physical';
import { round } from '../helpers';

export class Sphere3d extends Sphere {

  public static calculateDistance(sphere1: Sphere3d, sphere2: Sphere3d): RectSystemValue {
    return {
      X: round(Math.pow(sphere1.mesh.position.x + sphere2.mesh.position.x, 2)),
      Y: round(Math.pow(sphere1.mesh.position.y + sphere2.mesh.position.y, 2)),
      Z: round(Math.pow(sphere1.mesh.position.z + sphere2.mesh.position.z, 2)),
    }
  }

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

  public calculateMutualForce(affectingBody: Sphere3d): number {
    const distance: RectSystemValue = Sphere3d.calculateDistance(this, affectingBody);

    return 0;
  }
}