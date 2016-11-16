//// [declarationEmitDestructuringArrayPattern1.ts]

var [] = [1, "hello"]; // Dont emit anything
var [x] = [1, "hello"]; // emit x: number
var [x1, y1] = [1, "hello"]; // emit x1: number, y1: string
var [, , z1] = [0, 1, 2]; // emit z1: number

var a = [1, "hello"];
var [x2] = a;          // emit x2: number | string
var [x3, y3, z3] = a;  // emit x3, y3, z3 

//// [declarationEmitDestructuringArrayPattern1.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _a = [1, "hello"]; // Dont emit anything
var x = [1, "hello"][0]; // emit x: number
var _b = [1, "hello"], x1 = _b[0], y1 = _b[1]; // emit x1: number, y1: string
var _c = [0, 1, 2], z1 = _c[2]; // emit z1: number
var a = [1, "hello"];
var _d = __read(a, 1), x2 = _d[0]; // emit x2: number | string
var _e = __read(a, 3), x3 = _e[0], y3 = _e[1], z3 = _e[2]; // emit x3, y3, z3 


//// [declarationEmitDestructuringArrayPattern1.d.ts]
declare var x: number;
declare var x1: number, y1: string;
declare var z1: number;
declare var a: (string | number)[];
declare var x2: string | number;
declare var x3: string | number, y3: string | number, z3: string | number;
