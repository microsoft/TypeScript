//// [declarationEmitDestructuringArrayPattern1.ts]
var [] = [1, "hello"]; // Dont emit anything
var [x] = [1, "hello"]; // emit x: number
var [x1, y1] = [1, "hello"]; // emit x1: number, y1: string
var [, , z1] = [0, 1, 2]; // emit z1: number

var a = [1, "hello"];
var [x2] = a;          // emit x2: number | string
var [x3, y3, z3] = a;  // emit x3, y3, z3 

//// [declarationEmitDestructuringArrayPattern1.js]
var _a = [1, "hello"]; // Dont emit anything
var x = [1, "hello"][0]; // emit x: number
var _b = [1, "hello"], x1 = _b[0], y1 = _b[1]; // emit x1: number, y1: string
var _c = [0, 1, 2], z1 = _c[2]; // emit z1: number
var a = [1, "hello"];
var x2 = a[0]; // emit x2: number | string
var x3 = a[0], y3 = a[1], z3 = a[2]; // emit x3, y3, z3 


//// [declarationEmitDestructuringArrayPattern1.d.ts]
declare var x: number;
declare var x1: number, y1: string;
declare var z1: number;
declare var a: (string | number)[];
declare var x2: string | number;
declare var x3: string | number, y3: string | number, z3: string | number;
