//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock14.ts] ////

//// [classStaticBlock14.ts]
class C {
  static #_1 = 1;
  static #_3 = 1;
  static #_5 = 1;

  static {}
  static {}
  static {}
  static {}
  static {}
  static {}
}


//// [classStaticBlock14.js]
class C {
    static #_1 = 1;
    static #_3 = 1;
    static #_5 = 1;
    static { }
    static { }
    static { }
    static { }
    static { }
    static { }
}
