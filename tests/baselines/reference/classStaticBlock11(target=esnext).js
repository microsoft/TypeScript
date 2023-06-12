//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock11.ts] ////

//// [classStaticBlock11.ts]
let getX;
class C {
  #x = 1
  constructor(x: number) {
    this.#x = x;
  }

  static {
    // getX has privileged access to #x
    getX = (obj: C) => obj.#x;
  }
}


//// [classStaticBlock11.js]
let getX;
class C {
    #x = 1;
    constructor(x) {
        this.#x = x;
    }
    static {
        // getX has privileged access to #x
        getX = (obj) => obj.#x;
    }
}
