//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern1.ts] ////

//// [declarationEmitDestructuringArrayPattern1.ts]
var [] = [1, "hello"]; // Dont emit anything
var [x] = [1, "hello"]; // emit x: number
var [x1, y1] = [1, "hello"]; // emit x1: number, y1: string
var [, , z1] = [0, 1, 2]; // emit z1: number

var a = [1, "hello"];
var [x2] = a;          // emit x2: number | string
var [x3, y3, z3] = a;  // emit x3, y3, z3 

//// [declarationEmitDestructuringArrayPattern1.js]
var [] = [1, "hello"]; // Dont emit anything
var [x] = [1, "hello"]; // emit x: number
var [x1, y1] = [1, "hello"]; // emit x1: number, y1: string
var [, , z1] = [0, 1, 2]; // emit z1: number
var a = [1, "hello"];
var [x2] = a; // emit x2: number | string
var [x3, y3, z3] = a; // emit x3, y3, z3 


//// [declarationEmitDestructuringArrayPattern1.d.ts]
declare var x: number;
declare var x1: number, y1: string;
declare var z1: number;
declare var a: (string | number)[];
declare var x2: string | number;
declare var x3: string | number, y3: string | number, z3: string | number;
