import { PhysicalBody, Speed } from './body.class';

const DENSITY = 1;

export class Sphere extends PhysicalBody {
  constructor(mass: number, speed: Speed = {Vx: 0, Vy: 0, Vz: 0}) {
    super(mass, speed)
  }

  public get radius(): number {
    return Math.round(this.getCalculatedRadius() * 1000) / 1000;
  }

  private getVolume(): number {
    return DENSITY / this.mass;
  }

  private getCalculatedRadius() {
    const volume = this.getVolume();
    return Math.pow((3 * volume) / (4 * Math.PI), 1 / 3);
  }
}