//// [tests/cases/compiler/exportDefaultDeclareFunction.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default declare function A(): number;

//// [b.ts]
import A from "./a";

const x: number = A();

//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var x = a_1["default"]();
