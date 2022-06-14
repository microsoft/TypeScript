//// [tests/cases/compiler/exportDefaultType.ts] ////

//// [a.ts]
export default type A = number;

//// [b.ts]
import A from "./a"
let a: A;


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var a;
