//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock13.ts] ////

//// [classStaticBlock13.ts]
class C {
  static #x = 123;

  static {
    console.log(C.#x)
  }

  foo () {
    return C.#x;
  }
}


//// [classStaticBlock13.js]
class C {
    static #x = 123;
    static {
        console.log(C.#x);
    }
    foo() {
        return C.#x;
    }
}
