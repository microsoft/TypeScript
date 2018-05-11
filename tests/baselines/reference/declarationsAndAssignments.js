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
    var [a, b, c] = [];   // Ok, [] is an array
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

function f20() {
    var a: number[];
    var x: number;
    var y: number;
    var z: number;
    var [...a] = [1, 2, 3];
    var [x, ...a] = [1, 2, 3];
    var [x, y, ...a] = [1, 2, 3];
    var [x, y, z, ...a] = [1, 2, 3];
    [...a] = [1, 2, 3];
    [x, ...a] = [1, 2, 3];
    [x, y, ...a] = [1, 2, 3];
    [x, y, z, ...a] = [1, 2, 3];
}

function f21() {
    var a: (number | string | boolean)[];
    var x: number | string | boolean;
    var y: number | string | boolean;
    var z: number | string | boolean;
    var [...a] = [1, "hello", true];
    var [x, ...a] = [1, "hello", true];
    var [x, y, ...a] = [1, "hello", true];
    var [x, y, z, ...a] = [1, "hello", true];
    [...a] = [1, "hello", true];
    [x, ...a] = [1, "hello", true];
    [x, y, ...a] = [1, "hello", true];
    [x, y, z, ...a] = [1, "hello", true];
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
    var _a = { x: 5, y: "hello" }; // Error, no x and y in target
    var x = { x: 5, y: "hello" }.x; // Error, no y in target
    var y = { x: 5, y: "hello" }.y; // Error, no x in target
    var _b = { x: 5, y: "hello" }, x = _b.x, y = _b.y;
    var x;
    var y;
    var a = { x: 5, y: "hello" }.x; // Error, no y in target
    var b = { x: 5, y: "hello" }.y; // Error, no x in target
    var _c = { x: 5, y: "hello" }, a = _c.x, b = _c.y;
    var a;
    var b;
}
function f3() {
    var _a = [1, ["hello", [true]]], x = _a[0], _b = _a[1], y = _b[0], z = _b[1][0];
    var x;
    var y;
    var z;
}
function f4() {
    var _a = { a: 1, b: { a: "hello", b: { a: true } } }, x = _a.a, _b = _a.b, y = _b.a, z = _b.b.a;
    var x;
    var y;
    var z;
}
function f6() {
    var _a = [1, "hello"], _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? "" : _c;
    var x;
    var y;
}
function f7() {
    var _a = [1, "hello"], _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? 1 : _c; // Error, initializer for y must be string
    var x;
    var y;
}
function f8() {
    var _a = [], a = _a[0], b = _a[1], c = _a[2]; // Ok, [] is an array
    var _b = [1], d = _b[0], e = _b[1], f = _b[2]; // Error, [1] is a tuple
}
function f9() {
    var _a = {}, a = _a[0], b = _a[1]; // Error, not array type
    var _b = { 0: 10, 1: 20 }, c = _b[0], d = _b[1]; // Error, not array type
    var _c = [10, 20], e = _c[0], f = _c[1];
}
function f10() {
    var _a = {}, a = _a.a, b = _a.b; // Error
    var _b = [], a = _b.a, b = _b.b; // Error
}
function f11() {
    var _a = { x: 10, y: "hello" }, a = _a.x, b = _a.y;
    var _b = { 0: 10, 1: "hello" }, a = _b[0], b = _b[1];
    var _c = { "<": 10, ">": "hello" }, a = _c["<"], b = _c[">"];
    var _d = [10, "hello"], a = _d[0], b = _d[1];
    var a;
    var b;
}
function f12() {
    var _a = [1, ["hello", { x: 5, y: true }]], a = _a[0], _b = _a[1], _c = _b === void 0 ? ["abc", { x: 10, y: false }] : _b, b = _c[0], _d = _c[1], x = _d.x, c = _d.y;
    var a;
    var b;
    var x;
    var c;
}
function f13() {
    var _a = [1, "hello"], x = _a[0], y = _a[1];
    var _b = [[x, y], { x: x, y: y }], a = _b[0], b = _b[1];
}
function f14(_a) {
    var _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], _d = _c[0], b = _d === void 0 ? "hello" : _d, _e = _c[1], x = _e.x, _f = _e.y, c = _f === void 0 ? false : _f;
    var a;
    var b;
    var c;
}
f14([2, ["abc", { x: 0, y: true }]]);
f14([2, ["abc", { x: 0 }]]);
f14([2, ["abc", { y: false }]]); // Error, no x
var M;
(function (M) {
    var _a;
    _a = [1, 2], M.a = _a[0], M.b = _a[1];
})(M || (M = {}));
function f15() {
    var a = "hello";
    var b = 1;
    var c = true;
    return { a: a, b: b, c: c };
}
function f16() {
    var _a = f15(), a = _a.a, b = _a.b, c = _a.c;
}
function f17(_a) {
    var _b = _a.a, a = _b === void 0 ? "" : _b, _c = _a.b, b = _c === void 0 ? 0 : _c, _d = _a.c, c = _d === void 0 ? false : _d;
}
f17({});
f17({ a: "hello" });
f17({ c: true });
f17(f15());
function f18() {
    var _a, _b, _c, _d, _e, _f, _g;
    var a;
    var b;
    var aa;
    (_a = { a: a, b: b }, a = _a.a, b = _a.b);
    (_b = { b: b, a: a }, a = _b.a, b = _b.b);
    _c = [a, b], aa[0] = _c[0], b = _c[1];
    _d = [b, a], a = _d[0], b = _d[1]; // Error
    _e = [2, "def"], _f = _e[0], a = _f === void 0 ? 1 : _f, _g = _e[1], b = _g === void 0 ? "abc" : _g;
}
function f19() {
    var _a, _b, _c, _d, _e, _f;
    var a, b;
    _a = [1, 2], a = _a[0], b = _a[1];
    _b = [b, a], a = _b[0], b = _b[1];
    (_c = { b: b, a: a }, a = _c.a, b = _c.b);
    _d = [[2, 3]][0], _e = _d === void 0 ? [1, 2] : _d, a = _e[0], b = _e[1];
    var x = (_f = [1, 2], a = _f[0], b = _f[1], _f);
}
function f20() {
    var _a, _b, _c;
    var a;
    var x;
    var y;
    var z;
    var a = [1, 2, 3].slice(0);
    var _d = [1, 2, 3], x = _d[0], a = _d.slice(1);
    var _e = [1, 2, 3], x = _e[0], y = _e[1], a = _e.slice(2);
    var _f = [1, 2, 3], x = _f[0], y = _f[1], z = _f[2], a = _f.slice(3);
    a = [1, 2, 3].slice(0);
    _a = [1, 2, 3], x = _a[0], a = _a.slice(1);
    _b = [1, 2, 3], x = _b[0], y = _b[1], a = _b.slice(2);
    _c = [1, 2, 3], x = _c[0], y = _c[1], z = _c[2], a = _c.slice(3);
}
function f21() {
    var _a, _b, _c;
    var a;
    var x;
    var y;
    var z;
    var a = [1, "hello", true].slice(0);
    var _d = [1, "hello", true], x = _d[0], a = _d.slice(1);
    var _e = [1, "hello", true], x = _e[0], y = _e[1], a = _e.slice(2);
    var _f = [1, "hello", true], x = _f[0], y = _f[1], z = _f[2], a = _f.slice(3);
    a = [1, "hello", true].slice(0);
    _a = [1, "hello", true], x = _a[0], a = _a.slice(1);
    _b = [1, "hello", true], x = _b[0], y = _b[1], a = _b.slice(2);
    _c = [1, "hello", true], x = _c[0], y = _c[1], z = _c[2], a = _c.slice(3);
}
