//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default class A {
    A1: string = "init"
}
export default namespace B {
    export const A2 = 32;
}


//// [a.js]
"use strict";
exports.__esModule = true;
// https://github.com/Microsoft/TypeScript/issues/3792
var A = /** @class */ (function () {
    function A() {
        this.A1 = "init";
    }
    return A;
}());
exports["default"] = A;
var B;
(function (B) {
    B.A2 = 32;
})(B = exports.B || (exports.B = {}));
