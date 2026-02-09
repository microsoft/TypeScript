//// [tests/cases/compiler/noImplicitReturnInConstructors.ts] ////

//// [noImplicitReturnInConstructors.ts]
class C {
  constructor() {
    return;
  }
}

//// [noImplicitReturnInConstructors.js]
"use strict";
class C {
    constructor() {
        return;
    }
}
