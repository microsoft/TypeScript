//// [tests/cases/conformance/salsa/assignmentToVoidZero1.ts] ////

//// [assignmentToVoidZero1.js]
// #38552
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;


//// [assignmentToVoidZero1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #38552
export var y = exports.x = void 0;
// #38552
exports.y = exports.x = void 0;
export var x = 1;
exports.x = 1;
export var y = 2;
exports.y = 2;


//// [assignmentToVoidZero1.d.ts]
export var y = exports.x = void 0;
export var x = 1;
export var y = 2;
export {};
