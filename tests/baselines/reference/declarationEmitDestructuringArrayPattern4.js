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
var _a = [1, 2, 3], a5 = _a.slice(0);
var _b = [1, 2, 3], x14 = _b[0], a6 = _b.slice(1);
var _c = [1, 2, 3], x15 = _c[0], y15 = _c[1], a7 = _c.slice(2);
var _d = [1, 2, 3], x16 = _d[0], y16 = _d[1], z16 = _d[2], a8 = _d.slice(3);
var _e = [1, "hello", true], a9 = _e.slice(0);
var _f = [1, "hello", true], x17 = _f[0], a10 = _f.slice(1);
var _g = [1, "hello", true], x18 = _g[0], y18 = _g[1], a12 = _g.slice(2);
var _h = [1, "hello", true], x19 = _h[0], y19 = _h[1], z19 = _h[2], a13 = _h.slice(3);


//// [declarationEmitDestructuringArrayPattern4.d.ts]
declare var a5: number[];
declare var x14: number, a6: number[];
declare var x15: number, y15: number, a7: number[];
declare var x16: number, y16: number, z16: number, a8: number[];
declare var a9: (string | number | boolean)[];
declare var x17: string | number | boolean, a10: (string | number | boolean)[];
declare var x18: string | number | boolean, y18: string | number | boolean, a12: (string | number | boolean)[];
declare var x19: string | number | boolean, y19: string | number | boolean, z19: string | number | boolean, a13: (string | number | boolean)[];
