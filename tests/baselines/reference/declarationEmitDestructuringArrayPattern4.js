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
var [...a5] = [1, 2, 3];
var [x14, ...a6] = [1, 2, 3];
var [x15, y15, ...a7] = [1, 2, 3];
var [x16, y16, z16, ...a8] = [1, 2, 3];
var [...a9] = [1, "hello", true];
var [x17, ...a10] = [1, "hello", true];
var [x18, y18, ...a12] = [1, "hello", true];
var [x19, y19, z19, ...a13] = [1, "hello", true];


//// [declarationEmitDestructuringArrayPattern4.d.ts]
declare var a5: number[];
declare var x14: number, a6: [number, number];
declare var x15: number, y15: number, a7: [number];
declare var x16: number, y16: number, z16: number, a8: [];
declare var a9: (string | number | boolean)[];
declare var x17: number, a10: [string, boolean];
declare var x18: number, y18: string, a12: [boolean];
declare var x19: number, y19: string, z19: boolean, a13: [];
