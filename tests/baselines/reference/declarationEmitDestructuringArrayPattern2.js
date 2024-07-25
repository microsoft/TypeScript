//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern2.ts] ////

//// [declarationEmitDestructuringArrayPattern2.ts]
var [x10, [y10, [z10]]] = [1, ["hello", [true]]];

var [x11 = 0, y11 = ""] = [1, "hello"];
var [a11, b11, c11] = [];

var [a2, [b2, { x12, y12: c2 }]=["abc", { x12: 10, y12: false }]] = [1, ["hello", { x12: 5, y12: true }]];

var [x13, y13] = [1, "hello"];
var [a3, b3] = [[x13, y13], { x: x13, y: y13 }];


//// [declarationEmitDestructuringArrayPattern2.js]
var _a = [1, ["hello", [true]]], x10 = _a[0], _b = _a[1], y10 = _b[0], z10 = _b[1][0];
var _c = [1, "hello"], _d = _c[0], x11 = _d === void 0 ? 0 : _d, _e = _c[1], y11 = _e === void 0 ? "" : _e;
var _f = [], a11 = _f[0], b11 = _f[1], c11 = _f[2];
var _g = [1, ["hello", { x12: 5, y12: true }]], a2 = _g[0], _h = _g[1], _j = _h === void 0 ? ["abc", { x12: 10, y12: false }] : _h, b2 = _j[0], _k = _j[1], x12 = _k.x12, c2 = _k.y12;
var _l = [1, "hello"], x13 = _l[0], y13 = _l[1];
var _m = [[x13, y13], { x: x13, y: y13 }], a3 = _m[0], b3 = _m[1];


//// [declarationEmitDestructuringArrayPattern2.d.ts]
declare var x10: number, y10: string, z10: boolean;
declare var x11: number, y11: string;
declare var a11: undefined, b11: undefined, c11: undefined;
declare var a2: number, b2: string, x12: number, c2: boolean;
declare var x13: number, y13: string;
declare var a3: (string | number)[], b3: {
    x: number;
    y: string;
};
