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
    constructor(x) {
        this.#x = 1;
        this.#x = x;
    }
    #x;
    static {
        // getX has privileged access to #x
        getX = (obj) => obj.#x;
    }
}
