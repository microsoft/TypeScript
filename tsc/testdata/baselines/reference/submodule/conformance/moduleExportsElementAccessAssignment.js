//// [tests/cases/conformance/jsdoc/moduleExportsElementAccessAssignment.ts] ////

//// [mod1.js]
exports.a = { x: "x" };
exports["b"] = { x: "x" };
exports["default"] = { x: "x" };
module.exports["c"] = { x: "x" };
module["exports"]["d"] = {};
module["exports"]["d"].e = 0;

//// [mod2.js]
const mod1 = require("./mod1");
mod1.a;
mod1.b;
mod1.c;
mod1.d;
mod1.d.e;
mod1.default;



//// [mod1.d.ts]
export var a = { x: "x" };
export var b = { x: "x" };
export var default = { x: "x" };
export var c = { x: "x" };
export var d = {};
export {};
//// [mod2.d.ts]
export {};
