//// [classAbstractManyKeywords.ts]
export default abstract class A {}
export abstract class B {}
default abstract class C {}
import abstract class D {}

//// [classAbstractManyKeywords.js]
"use strict";
exports.__esModule = true;
exports.B = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports["default"] = A;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
