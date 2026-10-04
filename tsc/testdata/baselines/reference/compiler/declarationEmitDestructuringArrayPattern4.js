//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern4.ts] ////

//// [declarationEmitDestructuringArrayPattern4.ts]
var [...a5] = [1, 2, 3];
var [x14, ...a6] = [1, 2, 3];
var [x15, y15, ...a7] = [1, 2, 3];
var [x16, y16, z16, ...a8] = [1, 2, 3];

var [...a9] = [1, "hello", true];
var [x17, ...a10] = [1, "hello", true];
var [x18, y18, ...a12] = [1, "hello", true];
var [x19, y19, z19, ...a13] = [1, "hello", true];

//// [declarationEmitDestructuringArrayPattern4.js]
"use strict";
var [...a5] = [1, 2, 3];
var [x14, ...a6] = [1, 2, 3];
var [x15, y15, ...a7] = [1, 2, 3];
var [x16, y16, z16, ...a8] = [1, 2, 3];
var [...a9] = [1, "hello", true];
var [x17, ...a10] = [1, "hello", true];
var [x18, y18, ...a12] = [1, "hello", true];
var [x19, y19, z19, ...a13] = [1, "hello", true];


//// [declarationEmitDestructuringArrayPattern4.d.ts]
declare var [...a5]: number[];
declare var [x14, ...a6]: [number, number, number];
declare var [x15, y15, ...a7]: [number, number, number];
declare var [x16, y16, z16, ...a8]: [number, number, number];
declare var [...a9]: (string | number | boolean)[];
declare var [x17, ...a10]: [number, string, boolean];
declare var [x18, y18, ...a12]: [number, string, boolean];
declare var [x19, y19, z19, ...a13]: [number, string, boolean];
