//// [declarationEmitDestructuringArrayPattern2.ts]
var [x10, [y10, [z10]]] = [1, ["hello", [true]]];

var [x11 = 0, y11 = ""] = [1, "hello"];
var [a11, b11, c11] = [];

var [a2, [b2, { x12, y12: c2 }]=["abc", { x12: 10, y12: false }]] = [1, ["hello", { x12: 5, y12: true }]];

var [x13, y13] = [1, "hello"];
var [a3, b3] = [[x13, y13], { x: x13, y: y13 }];


//// [declarationEmitDestructuringArrayPattern2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _a = [1, ["hello", [true]]], x10 = _a[0], _b = __read(_a[1], 2), y10 = _b[0], _c = __read(_b[1], 1), z10 = _c[0];
var _d = [1, "hello"], _e = _d[0], x11 = _e === void 0 ? 0 : _e, _f = _d[1], y11 = _f === void 0 ? "" : _f;
var _g = [], a11 = _g[0], b11 = _g[1], c11 = _g[2];
var _h = [1, ["hello", { x12: 5, y12: true }]], a2 = _h[0], _j = _h[1], _k = __read(_j === void 0 ? ["abc", { x12: 10, y12: false }] : _j, 2), b2 = _k[0], _l = _k[1], x12 = _l.x12, c2 = _l.y12;
var _m = [1, "hello"], x13 = _m[0], y13 = _m[1];
var _o = [[x13, y13], { x: x13, y: y13 }], a3 = _o[0], b3 = _o[1];


//// [declarationEmitDestructuringArrayPattern2.d.ts]
declare var x10: number, y10: string, z10: boolean;
declare var x11: number, y11: string;
declare var a11: any, b11: any, c11: any;
declare var a2: number, b2: string, x12: number, c2: boolean;
declare var x13: number, y13: string;
declare var a3: (string | number)[], b3: {
    x: number;
    y: string;
};
