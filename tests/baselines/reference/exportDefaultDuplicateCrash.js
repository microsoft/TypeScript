//// [tests/cases/compiler/exportDefaultDuplicateCrash.ts] ////

//// [exportDefaultDuplicateCrash.ts]
// #38214

export default function () { }
export { default } from './hi'
export { aa as default } from './hi'


//// [exportDefaultDuplicateCrash.js]
"use strict";
// #38214
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
exports.default = default_1;
function default_1() { }
var hi_1 = require("./hi");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return hi_1.default; } });
var hi_2 = require("./hi");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return hi_2.aa; } });
