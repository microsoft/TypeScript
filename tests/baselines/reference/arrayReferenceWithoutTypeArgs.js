//// [tests/cases/compiler/arrayReferenceWithoutTypeArgs.ts] ////

//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
"use strict";
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function (a) { };
    return X;
}());
