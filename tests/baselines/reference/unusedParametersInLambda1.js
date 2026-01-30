//// [tests/cases/compiler/unusedParametersInLambda1.ts] ////

//// [unusedParametersInLambda1.ts]
class A {
    public f1() {
        return (X) => {
        }
    }
}

//// [unusedParametersInLambda1.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function (X) {
        };
    };
    return A;
}());
