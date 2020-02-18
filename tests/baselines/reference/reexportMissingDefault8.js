//// [tests/cases/compiler/reexportMissingDefault8.ts] ////

//// [b.ts]
const b = null;
export = b;

//// [a.ts]
export { default } from "./b";

//// [b.js]
"use strict";
var b = null;
module.exports = b;
//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
exports["default"] = b_1["default"];
