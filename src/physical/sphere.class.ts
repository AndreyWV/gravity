import { PhysicalBody, RectSystemValue } from './body.class';
import { round } from '../helpers';
import { DENSITY } from '../constants';

export class Sphere extends PhysicalBody {

  public get radius(): number {
    return round(this.getCalculatedRadius());
  }

  constructor(mass: number, speed: RectSystemValue = {X: 0, Y: 0, Z: 0}) {
    super(mass, speed);
    return this;
  }

  public calculateMutualForce(body: Sphere) {
    
  }

  private getVolume(): number {
    return this.mass / DENSITY;
  }

  private getCalculatedRadius() {
    const volume = this.getVolume();
    return Math.pow((3 * volume) / (4 * Math.PI), 1 / 3);
  }

}