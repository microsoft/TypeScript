//// [tests/cases/compiler/reexportMissingDefault3.ts] ////

//// [b.ts]
export const b = null;

//// [a.ts]
export { b } from "./b";
export { default as a } from "./b";

//// [b.js]
"use strict";
exports.__esModule = true;
exports.b = null;
//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
exports.b = b_1.b;
var b_2 = require("./b");
exports.a = b_2["default"];
