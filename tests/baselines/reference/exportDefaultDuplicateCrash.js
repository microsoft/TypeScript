//// [exportDefaultDuplicateCrash.ts]
// #38214

export default function () { }
export { default } from './hi'
export { aa as default } from './hi'


//// [exportDefaultDuplicateCrash.js]
"use strict";
// #38214
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports["default"] = void 0;
function default_1() { }
exports["default"] = default_1;
var hi_1 = require("./hi");
__createBinding(exports, hi_1, "default");
var hi_2 = require("./hi");
__createBinding(exports, hi_2, "aa", "default");
