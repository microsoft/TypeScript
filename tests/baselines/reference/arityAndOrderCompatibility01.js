//// [arityAndOrderCompatibility01.ts]
interface StrNum extends Array<string|number> {
    0: string;
    1: number;
}

var x: [string, number];
var y: StrNum
var z: {
    0: string;
    1: number;
}

var [a, b, c] = x;
var [d, e, f] = y;
var [g, h, i] = z;
var j1: [number, number, number] = x;
var j2: [number, number, number] = y;
var j3: [number, number, number] = z;
var k1: [string, number, number] = x;
var k2: [string, number, number] = y;
var k3: [string, number, number] = z;
var l1: [number] = x;
var l2: [number] = y;
var l3: [number] = z;
var m1: [string] = x;
var m2: [string] = y;
var m3: [string] = z;
var n1: [number, string] = x;
var n2: [number, string] = y;
var n3: [number, string] = z;
var o1: [string, number] = x;
var o2: [string, number] = y;
var o3: [string, number] = y;


//// [arityAndOrderCompatibility01.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var x;
var y;
var z;
var _a = __read(x, 3), a = _a[0], b = _a[1], c = _a[2];
var _b = __read(y, 3), d = _b[0], e = _b[1], f = _b[2];
var _c = __read(z, 3), g = _c[0], h = _c[1], i = _c[2];
var j1 = x;
var j2 = y;
var j3 = z;
var k1 = x;
var k2 = y;
var k3 = z;
var l1 = x;
var l2 = y;
var l3 = z;
var m1 = x;
var m2 = y;
var m3 = z;
var n1 = x;
var n2 = y;
var n3 = z;
var o1 = x;
var o2 = y;
var o3 = y;
