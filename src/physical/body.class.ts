export interface RectSystemValue {
  X: number;
  Y: number;
  Z: number;
}

export class PhysicalBody {
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