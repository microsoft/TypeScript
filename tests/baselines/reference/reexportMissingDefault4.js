//// [tests/cases/compiler/reexportMissingDefault4.ts] ////

//// [b.d.ts]
declare var b: number;
export { b };

//// [a.ts]
export { b } from "./b";
export { default } from "./b";

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.b = void 0;
var b_1 = require("./b");
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return b_1.b; } });
var b_2 = require("./b");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return b_2.default; } });
