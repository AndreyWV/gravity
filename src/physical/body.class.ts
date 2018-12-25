export interface Speed {
  Vx: number;
  Vy: number;
  Vz: number;
}

export interface Force {
  Fx: number;
  Fy: number;
  Fz: number;
}

export class PhysicalBody {
  public mass: number;
  public V: Speed;
  public F: Force;

  constructor(mass: number, speed: Speed = {Vx: 0, Vy: 0, Vz: 0}) {
    if (mass <= 0) {
      console.error('Mass can not be less than or equal to zero');
      return undefined;
    }
    this.mass = mass;
    this.V = speed;
  }
}