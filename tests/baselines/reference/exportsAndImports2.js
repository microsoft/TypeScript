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
exports.y = exports.x = void 0;
exports.x = "x";
exports.y = "y";
//// [t2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.x = exports.y = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "x", "y");
__createBinding(exports, t1_1, "y", "x");
//// [t3.js]
"use strict";
exports.__esModule = true;
exports.x = exports.y = void 0;
var t1_1 = require("./t1");
exports.y = t1_1.x;
exports.x = t1_1.y;
