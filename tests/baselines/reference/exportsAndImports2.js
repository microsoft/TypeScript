//// [tests/cases/conformance/es6/modules/exportsAndImports2.ts] ////

//// [t1.ts]

export var x = "x";
export var y = "y";

//// [t2.ts]
export { x as y, y as x } from "./t1";

//// [t3.ts]
import { x, y } from "./t1";
export { x as y, y as x };


//// [t1.js]
exports.x = "x";
exports.y = "y";
//// [t2.js]
var _t1 = require("./t1");
exports.y = _t1.x;
exports.x = _t1.y;
//// [t3.js]
var _t1 = require("./t1");
exports.y = _t1.x;
exports.x = _t1.y;
