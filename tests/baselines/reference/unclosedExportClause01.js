//// [tests/cases/compiler/unclosedExportClause01.ts] ////

//// [t1.ts]

export var x = "x";

//// [t2.ts]
export { x, from "./t1"

//// [t3.ts]
export { from "./t1"

//// [t4.ts]
export { x as a from "./t1"

//// [t5.ts]
export { x as a, from "./t1"

//// [t1.js]
exports.x = "x";
//// [t2.js]
var t1_1 = require("./t1");
exports.x = t1_1.x;
//// [t3.js]
//// [t4.js]
var t1_1 = require("./t1");
exports.a = t1_1.x;
//// [t5.js]
var t1_1 = require("./t1");
exports.a = t1_1.x;
