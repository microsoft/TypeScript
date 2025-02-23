//// [tests/cases/compiler/exportDefaultEnum.ts] ////

//// [a.ts]
export default enum A {
    A,
    B
}

//// [b.ts]
import A from "./a"

A.A;
A.B;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = {};
exports.default = A;
(function (A) {
    A[A["A"] = 0] = "A";
    A[A["B"] = 1] = "B";
})(A);
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
a_1.default.A;
a_1.default.B;
