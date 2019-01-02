import * as THREE from 'three';
import { Sphere, RectSystemValue } from '../physical';
import { round } from '../helpers';

export class Sphere3d extends Sphere {

  public static calculateDistance(body1: Sphere3d, body2: Sphere3d): RectSystemValue {
    return {
      X: Math.abs(body1.mesh.position.x - body2.mesh.position.x),
      Y: Math.abs(body1.mesh.position.y - body2.mesh.position.y),
      Z: Math.abs(body1.mesh.position.z - body2.mesh.position.z),
    }
  }

  public static calculateAbsoluteDistance(body1: Sphere3d, body2: Sphere3d): number {
    const distance = Sphere3d.calculateDistance(body1, body2);
    return round(
      Math.sqrt(Math.pow(distance.X, 2) + Math.pow(distance.Y, 2) + Math.pow(distance.Z, 2))
    );
  }

  public static isCollision(body1: Sphere3d, body2: Sphere3d): boolean {
    if (body1 === body2) {
      return false;
    }
    const distance = Sphere3d.calculateAbsoluteDistance(body1, body2);
    // CORRECTIONAL_COEFFICIENT defines Error correction when calculate collision
    // Error occurs because of high speed of particles
    const CORRECTIONAL_COEFFICIENT = 1.5;
    return (distance / CORRECTIONAL_COEFFICIENT < body1.radius + body2.radius);
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
    const force: RectSystemValue = this.calculateMutualForce(affectingBody);
    return {
      X: this.correctSpeedDirection(force.X * affectingBody.mass, affectingBody, 'x'),
      Y: this.correctSpeedDirection(force.Y * affectingBody.mass, affectingBody, 'y'),
      Z: this.correctSpeedDirection(force.Z * affectingBody.mass, affectingBody, 'z'),
    }
  }

  private correctSpeedDirection(speed: number, affectingBody: Sphere3d, coord: 'x' | 'y' | 'z'): number {
    return (affectingBody.mesh.position[coord] > this.mesh.position[coord]) ?
      speed:
      -speed;
  }
}