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
"use strict";
exports.__esModule = true;
exports.x = "x";
exports.y = "y";
//// [t2.js]
"use strict";
exports.__esModule = true;
var t1_1 = require("./t1");
exports.y = t1_1.x;
exports.x = t1_1.y;
//// [t3.js]
"use strict";
exports.__esModule = true;
var t1_1 = require("./t1");
exports.y = t1_1.x;
exports.x = t1_1.y;
