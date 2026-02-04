//// [tests/cases/compiler/scopeTests.ts] ////

//// [scopeTests.ts]
class C { private v; public p; static s; }
class D extends C {
  public v: number;
  public p: number
  constructor() {
   super()
   this.v = 1;
   this.p = 1;
   C.s = 1;
  }
}

//// [scopeTests.js]
class C {
}
class D extends C {
    constructor() {
        super();
        this.v = 1;
        this.p = 1;
        C.s = 1;
    }
}
