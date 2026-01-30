//// [tests/cases/compiler/noImplicitReturnInConstructors.ts] ////

//// [noImplicitReturnInConstructors.ts]
class C {
  constructor() {
    return;
  }
}

//// [noImplicitReturnInConstructors.js]
class C {
    constructor() {
        return;
    }
}
