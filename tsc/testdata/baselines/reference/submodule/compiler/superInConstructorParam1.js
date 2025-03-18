//// [tests/cases/compiler/superInConstructorParam1.ts] ////

//// [superInConstructorParam1.ts]
class B {
  public foo(): number {
    return 0;
  }
}

class C extends B {
  constructor(a = super.foo()) {
  }
}

//// [superInConstructorParam1.js]
class B {
    foo() {
        return 0;
    }
}
class C extends B {
    constructor(a = super.foo()) {
    }
}
