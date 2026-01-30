//// [tests/cases/compiler/indexSignatureWithInitializer1.ts] ////

//// [indexSignatureWithInitializer1.ts]
class C {
  [a: number = 1]: number;
}

//// [indexSignatureWithInitializer1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
