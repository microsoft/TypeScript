//// [tests/cases/compiler/exportToString.ts] ////

//// [exportToString.ts]
const toString = 0;
export { toString };


//// [exportToString.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
var toString = 0;
exports.toString = toString;
