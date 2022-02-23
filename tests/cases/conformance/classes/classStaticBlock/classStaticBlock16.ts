// @target: es2015

let getX: (c: C) => number;
class C {
  #x = 1
  constructor(x: number) {
    this.#x = x;
  }

  static {
    // getX has privileged access to #x
    getX = (obj: C) => obj.#x;
    getY = (obj: D) => obj.#y;
  }
}

let getY: (c: D) => number;
class D {
  #y = 1

  static {
    // getY has privileged access to y
    getX = (obj: C) => obj.#x;
    getY = (obj: D) => obj.#y;
  }
}