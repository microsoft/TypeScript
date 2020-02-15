//// [tests/cases/compiler/reexportMissingDefault4.ts] ////

//// [b.d.ts]
declare var b: number;
export { b };

//// [a.ts]
export { b } from "./b";
export { default } from "./b";

//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
exports.b = b_1.b;
var b_2 = require("./b");
exports["default"] = b_2["default"];
