//// [tests/cases/compiler/exportDefaultClodule.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default class A {
    A1: string
}
export default namespace A {
    export const A2 = 32;
}

//// [b.ts]
import A from "./a";

const a = new A();
const a2 = A.A2;

//// [a.js]
"use strict";
exports.__esModule = true;
// https://github.com/Microsoft/TypeScript/issues/3792
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports["default"] = A;
(function (A) {
    A.A2 = 32;
})(A);
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var a = new a_1["default"]();
var a2 = a_1["default"].A2;
