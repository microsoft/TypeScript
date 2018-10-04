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
var a5 = [1, 2, 3].slice(0);
var _a = [1, 2, 3], x14 = _a[0], a6 = _a.slice(1);
var _b = [1, 2, 3], x15 = _b[0], y15 = _b[1], a7 = _b.slice(2);
var _c = [1, 2, 3], x16 = _c[0], y16 = _c[1], z16 = _c[2], a8 = _c.slice(3);
var a9 = [1, "hello", true].slice(0);
var _d = [1, "hello", true], x17 = _d[0], a10 = _d.slice(1);
var _e = [1, "hello", true], x18 = _e[0], y18 = _e[1], a12 = _e.slice(2);
var _f = [1, "hello", true], x19 = _f[0], y19 = _f[1], z19 = _f[2], a13 = _f.slice(3);


//// [declarationEmitDestructuringArrayPattern4.d.ts]
declare var a5: number[];
declare var x14: number, a6: [number, number];
declare var x15: number, y15: number, a7: [number];
declare var x16: number, y16: number, z16: number, a8: [];
declare var a9: (string | number | boolean)[];
declare var x17: number, a10: [string, boolean];
declare var x18: number, y18: string, a12: [boolean];
declare var x19: number, y19: string, z19: boolean, a13: [];
