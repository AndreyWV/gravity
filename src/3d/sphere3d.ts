import * as THREE from 'three';
import { Sphere, RectSystemValue } from '../physical';

export class Sphere3d extends Sphere {

  public static calculateDistance(body1: Sphere3d, body2: Sphere3d): RectSystemValue {
    return {
      X: Math.abs(body1.mesh.position.x - body2.mesh.position.x),
      Y: Math.abs(body1.mesh.position.y - body2.mesh.position.y),
      Z: Math.abs(body1.mesh.position.z - body2.mesh.position.z),
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

  public calculateMutualForce(affectingBody: Sphere3d): RectSystemValue {
    if (affectingBody === this) {
      return {X: 0, Y: 0, Z: 0};
    }
    const distance: RectSystemValue = Sphere3d.calculateDistance(this, affectingBody);
    return Sphere3d.calculateGravitation(this, affectingBody, distance);
  }

  public calculateSpeedDelta(affectingBody: Sphere3d): RectSystemValue {
    if (affectingBody === this) {
      return {X: 0, Y: 0, Z: 0};
    }
    const force = this.calculateMutualForce(affectingBody);
    return {
      X: this.correctSpeedDirection(force.X * this.mass, affectingBody, 'X'),
      Y: this.correctSpeedDirection(force.Y * this.mass, affectingBody, 'Y'),
      Z: this.correctSpeedDirection(force.Z * this.mass, affectingBody, 'Z'),
    }
  }

  private correctSpeedDirection(speed: number, affectingBody: Sphere3d, coord: 'X' | 'Y' | 'Z'): number {
    return (affectingBody.mesh.position[coord] > this.mesh.position[coord]) ?
      speed:
      -speed;
  }
}