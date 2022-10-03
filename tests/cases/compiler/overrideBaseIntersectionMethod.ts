// @strict: true

// Repro from #14615

type Constructor<T> = new (...args: any[]) => T;

const WithLocation = <T extends Constructor<Point>>(Base: T) => class extends Base {
  getLocation(): [number, number] {
    const [x,y] = super.getLocation();
    return [this.x | x, this.y | y];
  }
}

class Point {
  constructor(public x: number, public y: number) { }
  getLocation(): [number, number] {
    return [0,0];
  }
}

class Foo extends WithLocation(Point) {
  calculate() {
    return this.x + this.y;
  }
  getLocation() {
    return super.getLocation()
  }
  whereAmI() {
    return this.getLocation();
  }
}
