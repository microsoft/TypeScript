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
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = "x";
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
exports.from = exports.x = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "x");
__createBinding(exports, t1_1, "from");
//// [t3.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.from = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "from");
//// [t4.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.from = exports.a = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "x", "a");
__createBinding(exports, t1_1, "from");
//// [t5.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.from = exports.a = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "x", "a");
__createBinding(exports, t1_1, "from");
