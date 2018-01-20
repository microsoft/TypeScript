//// [tests/cases/compiler/exportDefaultType.ts] ////

//// [int.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default type int = number

//// [b.ts]
import int from "./int";

const intUsage: int = 23;

//// [int.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var intUsage = 23;
