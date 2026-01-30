//// [tests/cases/compiler/unusedTypeParameterInMethod4.ts] ////

//// [unusedTypeParameterInMethod4.ts]
class A {
    public f1<X>() {

    }
}

//// [unusedTypeParameterInMethod4.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
    };
    return A;
}());
