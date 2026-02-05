//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock12.ts] ////

//// [classStaticBlock12.ts]
class C {
  static #x = 1;
  
  static {
    C.#x;
  }
}


//// [classStaticBlock12.js]
"use strict";
class C {
    static #x = 1;
    static {
        C.#x;
    }
}
