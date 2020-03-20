//// [declarationsAndAssignments.ts]
function f0() {
    var [] = [1, "hello"];
    var [x] = [1, "hello"];
    var [x, y] = [1, "hello"];
    var [x, y, z] = [1, "hello"];
    var [,, x] = [0, 1, 2];
    var x: number;
    var y: string;
}

function f1() {
    var a = [1, "hello"];
    var [x] = a;
    var [x, y] = a;
    var [x, y, z] = a;
    var x: number | string;
    var y: number | string;
    var z: number | string;
}

function f2() {
    var { } = { x: 5, y: "hello" };       // Error, no x and y in target
    var { x } = { x: 5, y: "hello" };     // Error, no y in target
    var { y } = { x: 5, y: "hello" };     // Error, no x in target
    var { x, y } = { x: 5, y: "hello" };
    var x: number;
    var y: string;
    var { x: a } = { x: 5, y: "hello" };  // Error, no y in target
    var { y: b } = { x: 5, y: "hello" };  // Error, no x in target
    var { x: a, y: b } = { x: 5, y: "hello" };
    var a: number;
    var b: string;
}

function f3() {
    var [x, [y, [z]]] = [1, ["hello", [true]]];
    var x: number;
    var y: string;
    var z: boolean;
}

function f4() {
    var { a: x, b: { a: y, b: { a: z }}} = { a: 1, b: { a: "hello", b: { a: true } } };
    var x: number;
    var y: string;
    var z: boolean;
}

function f6() {
    var [x = 0, y = ""] = [1, "hello"];
    var x: number;
    var y: string;
}

function f7() {
    var [x = 0, y = 1] = [1, "hello"];  // Error, initializer for y must be string
    var x: number;
    var y: string;
}

function f8() {
    var [a, b, c] = [];   // Error, [] is an empty tuple
    var [d, e, f] = [1];  // Error, [1] is a tuple
}

function f9() {
    var [a, b] = {};                // Error, not array type
    var [c, d] = { 0: 10, 1: 20 };  // Error, not array type
    var [e, f] = [10, 20];
}

function f10() {
    var { a, b } = {};  // Error
    var { a, b } = [];  // Error
}

function f11() {
    var { x: a, y: b } = { x: 10, y: "hello" };
    var { 0: a, 1: b } = { 0: 10, 1: "hello" };
    var { "<": a, ">": b } = { "<": 10, ">": "hello" };
    var { 0: a, 1: b } = [10, "hello"];
    var a: number;
    var b: string;
}

function f12() {
    var [a, [b, { x, y: c }] = ["abc", { x: 10, y: false }]] = [1, ["hello", { x: 5, y: true }]];
    var a: number;
    var b: string;
    var x: number;
    var c: boolean;
}

function f13() {
    var [x, y] = [1, "hello"];
    var [a, b] = [[x, y], { x: x, y: y }];
}

function f14([a = 1, [b = "hello", { x, y: c = false }]]) {
    var a: number;
    var b: string;
    var c: boolean;
}
f14([2, ["abc", { x: 0, y: true }]]);
f14([2, ["abc", { x: 0 }]]);
f14([2, ["abc", { y: false }]]);  // Error, no x

module M {
    export var [a, b] = [1, 2];
}

function f15() {
    var a = "hello";
    var b = 1;
    var c = true;
    return { a, b, c };
}

function f16() {
    var { a, b, c } = f15();
}

function f17({ a = "", b = 0, c = false }) {
}

f17({});
f17({ a: "hello" });
f17({ c: true });
f17(f15());

function f18() {
    var a: number;
    var b: string;
    var aa: number[];
    ({ a, b } = { a, b });
    ({ a, b } = { b, a });
    [aa[0], b] = [a, b];
    [a, b] = [b, a];  // Error
    [a = 1, b = "abc"] = [2, "def"];
}

function f19() {
    var a, b;
    [a, b] = [1, 2];
    [a, b] = [b, a];
    ({ a, b } = { b, a });
    [[a, b] = [1, 2]] = [[2, 3]];
    var x = ([a, b] = [1, 2]);
}

function f20(v: [number, number, number]) {
    var x: number;
    var y: number;
    var z: number;
    var a0: [];
    var a1: [number];
    var a2: [number, number];
    var a3: [number, number, number];
    var [...a3] = v;
    var [x, ...a2] = v;
    var [x, y, ...a1] = v;
    var [x, y, z, ...a0] = v;
    [...a3] = v;
    [x, ...a2] = v;
    [x, y, ...a1] = v;
    [x, y, z, ...a0] = v;
}

function f21(v: [number, string, boolean]) {
    var x: number;
    var y: string;
    var z: boolean;
    var a0: [number, string, boolean];
    var a1: [string, boolean];
    var a2: [boolean];
    var a3: [];
    var [...a0] = v;
    var [x, ...a1] = v;
    var [x, y, ...a2] = v;
    var [x, y, z, ...a3] = v;
    [...a0] = v;
    [x, ...a1] = v;
    [x, y, ...a2] = v;
    [x, y, z, ...a3] = v;
}


//// [declarationsAndAssignments.js]
function f0() {
    var _a = [1, "hello"];
    var x = [1, "hello"][0];
    var _b = [1, "hello"], x = _b[0], y = _b[1];
    var _c = [1, "hello"], x = _c[0], y = _c[1], z = _c[2];
    var _d = [0, 1, 2], x = _d[2];
    var x;
    var y;
}
function f1() {
    var a = [1, "hello"];
    var x = a[0];
    var x = a[0], y = a[1];
    var x = a[0], y = a[1], z = a[2];
    var x;
    var y;
    var z;
}
function f2() {
    var _e = { x: 5, y: "hello" }; // Error, no x and y in target
    var x = { x: 5, y: "hello" }.x; // Error, no y in target
    var y = { x: 5, y: "hello" }.y; // Error, no x in target
    var _f = { x: 5, y: "hello" }, x = _f.x, y = _f.y;
    var x;
    var y;
    var a = { x: 5, y: "hello" }.x; // Error, no y in target
    var b = { x: 5, y: "hello" }.y; // Error, no x in target
    var _g = { x: 5, y: "hello" }, a = _g.x, b = _g.y;
    var a;
    var b;
}
function f3() {
    var _h = [1, ["hello", [true]]], x = _h[0], _j = _h[1], y = _j[0], z = _j[1][0];
    var x;
    var y;
    var z;
}
function f4() {
    var _k = { a: 1, b: { a: "hello", b: { a: true } } }, x = _k.a, _l = _k.b, y = _l.a, z = _l.b.a;
    var x;
    var y;
    var z;
}
function f6() {
    var _m = [1, "hello"], _o = _m[0], x = _o === void 0 ? 0 : _o, _p = _m[1], y = _p === void 0 ? "" : _p;
    var x;
    var y;
}
function f7() {
    var _q = [1, "hello"], _r = _q[0], x = _r === void 0 ? 0 : _r, _s = _q[1], y = _s === void 0 ? 1 : _s; // Error, initializer for y must be string
    var x;
    var y;
}
function f8() {
    var _t = [], a = _t[0], b = _t[1], c = _t[2]; // Error, [] is an empty tuple
    var _u = [1], d = _u[0], e = _u[1], f = _u[2]; // Error, [1] is a tuple
}
function f9() {
    var _v = {}, a = _v[0], b = _v[1]; // Error, not array type
    var _w = { 0: 10, 1: 20 }, c = _w[0], d = _w[1]; // Error, not array type
    var _x = [10, 20], e = _x[0], f = _x[1];
}
function f10() {
    var _y = {}, a = _y.a, b = _y.b; // Error
    var _z = [], a = _z.a, b = _z.b; // Error
}
function f11() {
    var _0 = { x: 10, y: "hello" }, a = _0.x, b = _0.y;
    var _1 = { 0: 10, 1: "hello" }, a = _1[0], b = _1[1];
    var _2 = { "<": 10, ">": "hello" }, a = _2["<"], b = _2[">"];
    var _3 = [10, "hello"], a = _3[0], b = _3[1];
    var a;
    var b;
}
function f12() {
    var _4 = [1, ["hello", { x: 5, y: true }]], a = _4[0], _5 = _4[1], _6 = _5 === void 0 ? ["abc", { x: 10, y: false }] : _5, b = _6[0], _7 = _6[1], x = _7.x, c = _7.y;
    var a;
    var b;
    var x;
    var c;
}
function f13() {
    var _8 = [1, "hello"], x = _8[0], y = _8[1];
    var _9 = [[x, y], { x: x, y: y }], a = _9[0], b = _9[1];
}
function f14(_10) {
    var _11 = _10[0], a = _11 === void 0 ? 1 : _11, _12 = _10[1], _13 = _12[0], b = _13 === void 0 ? "hello" : _13, _14 = _12[1], x = _14.x, _15 = _14.y, c = _15 === void 0 ? false : _15;
    var a;
    var b;
    var c;
}
f14([2, ["abc", { x: 0, y: true }]]);
f14([2, ["abc", { x: 0 }]]);
f14([2, ["abc", { y: false }]]); // Error, no x
var M;
(function (M) {
    var _16;
    _16 = [1, 2], M.a = _16[0], M.b = _16[1];
})(M || (M = {}));
function f15() {
    var a = "hello";
    var b = 1;
    var c = true;
    return { a: a, b: b, c: c };
}
function f16() {
    var _17 = f15(), a = _17.a, b = _17.b, c = _17.c;
}
function f17(_18) {
    var _19 = _18.a, a = _19 === void 0 ? "" : _19, _20 = _18.b, b = _20 === void 0 ? 0 : _20, _21 = _18.c, c = _21 === void 0 ? false : _21;
}
f17({});
f17({ a: "hello" });
f17({ c: true });
f17(f15());
function f18() {
    var _22, _23, _24, _25, _26, _27, _28;
    var a;
    var b;
    var aa;
    (_22 = { a: a, b: b }, a = _22.a, b = _22.b);
    (_23 = { b: b, a: a }, a = _23.a, b = _23.b);
    _24 = [a, b], aa[0] = _24[0], b = _24[1];
    _25 = [b, a], a = _25[0], b = _25[1]; // Error
    _26 = [2, "def"], _27 = _26[0], a = _27 === void 0 ? 1 : _27, _28 = _26[1], b = _28 === void 0 ? "abc" : _28;
}
function f19() {
    var _29, _30, _31, _32, _33, _34;
    var a, b;
    _29 = [1, 2], a = _29[0], b = _29[1];
    _30 = [b, a], a = _30[0], b = _30[1];
    (_31 = { b: b, a: a }, a = _31.a, b = _31.b);
    _32 = [[2, 3]][0], _33 = _32 === void 0 ? [1, 2] : _32, a = _33[0], b = _33[1];
    var x = (_34 = [1, 2], a = _34[0], b = _34[1], _34);
}
function f20(v) {
    var x;
    var y;
    var z;
    var a0;
    var a1;
    var a2;
    var a3;
    var a3 = v.slice(0);
    var x = v[0], a2 = v.slice(1);
    var x = v[0], y = v[1], a1 = v.slice(2);
    var x = v[0], y = v[1], z = v[2], a0 = v.slice(3);
    a3 = v.slice(0);
    x = v[0], a2 = v.slice(1);
    x = v[0], y = v[1], a1 = v.slice(2);
    x = v[0], y = v[1], z = v[2], a0 = v.slice(3);
}
function f21(v) {
    var x;
    var y;
    var z;
    var a0;
    var a1;
    var a2;
    var a3;
    var a0 = v.slice(0);
    var x = v[0], a1 = v.slice(1);
    var x = v[0], y = v[1], a2 = v.slice(2);
    var x = v[0], y = v[1], z = v[2], a3 = v.slice(3);
    a0 = v.slice(0);
    x = v[0], a1 = v.slice(1);
    x = v[0], y = v[1], a2 = v.slice(2);
    x = v[0], y = v[1], z = v[2], a3 = v.slice(3);
}
