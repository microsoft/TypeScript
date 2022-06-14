//// [tests/cases/compiler/exportDefaultModule.ts] ////

//// [a.ts]
export default module A {
    export const Foo = 1;
}

//// [b.ts]
import A from "./a"
A.Foo;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = {};
exports.default = A;
(function (A) {
    A.Foo = 1;
})(A);
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
a_1.default.Foo;
