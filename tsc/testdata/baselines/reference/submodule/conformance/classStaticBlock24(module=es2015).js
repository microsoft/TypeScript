//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock24.ts] ////

//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
export class C {
    static x;
    static {
        C.x = 1;
    }
}
