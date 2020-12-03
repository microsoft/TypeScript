//// [tests/cases/compiler/reexportMissingDefault1.ts] ////

//// [b.ts]
export const b = null;

//// [a.ts]
export { b } from "./b";
export { default } from "./b";


//// [b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = null;
//// [a.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports["default"] = exports.b = void 0;
var b_1 = require("./b");
__createBinding(exports, b_1, "b");
var b_2 = require("./b");
__createBinding(exports, b_2, "default");
