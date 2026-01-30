//// [tests/cases/compiler/noImplicitReturnInConstructors.ts] ////

//// [noImplicitReturnInConstructors.ts]
class C {
  constructor() {
    return;
  }
}

//// [noImplicitReturnInConstructors.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
        return;
    }
    return C;
}());
