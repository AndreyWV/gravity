import { PhysicalBody, Speed } from './physical-body.class';

const DENSITY = 1;

export class ThreeDBody extends PhysicalBody {
  constructor(mass: number, speed: Speed = {Vx: 0, Vy: 0, Vz: 0}) {
    super(mass, speed)
  }

  public getRadius(): number {
    const volume = this.getVolume();
    const radius = Math.pow((3 * volume) / (4 * Math.PI), 1 / 3);
    return Math.round(radius * 1000) / 1000;
  }

  private getVolume(): number {
    return DENSITY / this.mass;
  }
}