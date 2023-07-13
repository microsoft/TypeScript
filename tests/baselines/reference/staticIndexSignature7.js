//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature7.ts] ////

//// [staticIndexSignature7.ts]
class X {
    static [index: string]: string;
    static x = 12; // Should error, incompatible with index signature
}
class Y {
    static [index: string]: string;
    static foo() {} // should error, incompatible with index signature
}


//// [staticIndexSignature7.js]
"use strict";
var X = /** @class */ (function () {
    function X() {
    }
    X.x = 12; // Should error, incompatible with index signature
    return X;
}());
var Y = /** @class */ (function () {
    function Y() {
    }
    Y.foo = function () { }; // should error, incompatible with index signature
    return Y;
}());
