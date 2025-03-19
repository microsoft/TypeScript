//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock16.ts] ////

//// [classStaticBlock16.ts]
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

//// [classStaticBlock16.js]
let getX;
class C {
    #x = 1;
    constructor(x) {
        this.#x = x;
    }
    static {
        // getX has privileged access to #x
        getX = (obj) => obj.#x;
        getY = (obj) => obj.#y;
    }
}
let getY;
class D {
    #y = 1;
    static {
        // getY has privileged access to y
        getX = (obj) => obj.#x;
        getY = (obj) => obj.#y;
    }
}
