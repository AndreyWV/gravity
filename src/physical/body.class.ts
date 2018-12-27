import { round } from '../helpers';
import { G } from '../constants';

export interface RectSystemValue {
  X: number;
  Y: number;
  Z: number;
}

export class PhysicalBody {

  public static calculateGravitation(
    body1: PhysicalBody,
    body2: PhysicalBody,
    distance: RectSystemValue
  ): RectSystemValue {
    const absoluteDistance = round(
      Math.sqrt(Math.pow(distance.X, 2) + Math.pow(distance.Y, 2) + Math.pow(distance.Z, 2))
    );
    const absoluteGravity = round(G * body1.mass * body2.mass / Math.pow(absoluteDistance, 2));
    // console.log(absoluteGravity);
    console.log({
      X: distance.X ? round(G * body1.mass * body2.mass / Math.pow(distance.X, 2)) : 0,
      Y: distance.Y ? round(G * body1.mass * body2.mass / Math.pow(distance.Y, 2)) : 0,
      Z: distance.Z ? round(G * body1.mass * body2.mass / Math.pow(distance.Z, 2)) : 0,
    });
    
    return {
      X: distance.X ? round(G * body1.mass * body2.mass / Math.pow(distance.X, 2)) : 0,
      Y: distance.Y ? round(G * body1.mass * body2.mass / Math.pow(distance.Y, 2)) : 0,
      Z: distance.Z ? round(G * body1.mass * body2.mass / Math.pow(distance.Z, 2)) : 0,
    }
  }

  public mass: number;
  public V: RectSystemValue;

  public get F(): RectSystemValue {
    return {
      X: this.mass * this.V.X,
      Y: this.mass * this.V.Y,
      Z: this.mass * this.V.Z,
    };
  }

  constructor(mass: number, speed: RectSystemValue = {X: 0, Y: 0, Z: 0}) {
    if (mass <= 0) {
      console.error('Mass can not be less than or equal to zero');
      return undefined;
    }
    this.mass = mass;
    this.V = speed;

    return this;
  }
  
}