//// [tests/cases/compiler/exportDefaultDeclareClass.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default declare class A {
    foo(): number
 }

//// [b.ts]
import A from "./a";

const x = new A().foo();

//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var x = new a_1["default"]().foo();
