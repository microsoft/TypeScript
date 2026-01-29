//// [tests/cases/compiler/isolatedDeclarationsAllowJs.ts] ////

//// [file1.ts]
export var x;
//// [file2.js]
export var y;

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;


//// [file2.d.ts]
export const y: any;
