//// [tests/cases/compiler/scopeCheckClassProperty.ts] ////

//// [scopeCheckClassProperty.ts]
class C {
  constructor() {
    new A().p; // ok
  }
  public x = new A().p; // should also be ok
}
class A {
  public p = '';
}


//// [scopeCheckClassProperty.js]
class C {
    constructor() {
        this.x = new A().p; // should also be ok
        new A().p; // ok
    }
}
class A {
    constructor() {
        this.p = '';
    }
}
