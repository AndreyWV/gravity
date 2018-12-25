export interface Speed {
  X: number;
  Y: number;
  Z: number;
}

export interface Force {
  X: number;
  Y: number;
  Z: number;
}

export class PhysicalBody {
  public mass: number;
  public V: Speed;

  constructor(mass: number, speed: Speed = {X: 0, Y: 0, Z: 0}) {
    if (mass <= 0) {
      console.error('Mass can not be less than or equal to zero');
      return undefined;
    }
    this.mass = mass;
    this.V = speed;
  }

  public get F(): Force {
    return {
      X: this.mass * this.V.X,
      Y: this.mass * this.V.Y,
      Z: this.mass * this.V.Z,
    };
  }
}