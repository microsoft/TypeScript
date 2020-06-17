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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports["default"] = void 0;
var b_1 = require("./b");
__createBinding(exports, b_1, "default");
