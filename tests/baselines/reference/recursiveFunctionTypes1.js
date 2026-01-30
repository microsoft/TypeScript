//// [tests/cases/compiler/recursiveFunctionTypes1.ts] ////

//// [recursiveFunctionTypes1.ts]
class C {
     static g(t: typeof C.g){ }
}

//// [recursiveFunctionTypes1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.g = function (t) { };
    return C;
}());
