//// [tests/cases/compiler/systemModule10_ES5.ts] ////

//// [systemModule10_ES5.ts]
import n, {x} from 'file1'
import n2 = require('file2');
export {x}
export {x as y}
export {n}
export {n as n1}
export {n2}
export {n2 as n3}

//// [systemModule10_ES5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.n3 = exports.n2 = exports.n1 = exports.n = exports.y = exports.x = void 0;
const file1_1 = require("file1");
exports.n = file1_1.default;
exports.n1 = file1_1.default;
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return file1_1.x; } });
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return file1_1.x; } });
const n2 = require("file2");
exports.n2 = n2;
exports.n3 = n2;
