//// [declarationsAndAssignments.ts]
function f0() {
    var [] = [1, "hello"];
    var [x] = [1, "hello"];
    var [x, y] = [1, "hello"];
    var [x, y, z] = [1, "hello"];  // Error
    var [,, z] = [0, 1, 2];
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
    var { } = { x: 5, y: "hello" };
    var { x } = { x: 5, y: "hello" };
    var { y } = { x: 5, y: "hello" };
    var { x, y } = { x: 5, y: "hello" };
    var x: number;
    var y: string;
    var { x: a } = { x: 5, y: "hello" };
    var { y: b } = { x: 5, y: "hello" };
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
    var x = ([1, "hello"])[0];
    var _a_1 = [1, "hello"], x = _a_1[0], y = _a_1[1];
    var _a_2 = [1, "hello"], x = _a_2[0], y = _a_2[1], z = _a_2[2]; // Error
    var _a_3 = [0, 1, 2], z = _a_3[2];
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
    var _a = { x: 5, y: "hello" };
    var x = ({ x: 5, y: "hello" }).x;
    var y = ({ x: 5, y: "hello" }).y;
    var _a_1 = { x: 5, y: "hello" }, x = _a_1.x, y = _a_1.y;
    var x;
    var y;
    var a = ({ x: 5, y: "hello" }).x;
    var b = ({ x: 5, y: "hello" }).y;
    var _a_2 = { x: 5, y: "hello" }, a = _a_2.x, b = _a_2.y;
    var a;
    var b;
}
function f3() {
    var _a = [1, ["hello", [true]]], x = _a[0], _a_1 = _a[1], y = _a_1[0], z = _a_1[1][0];
    var x;
    var y;
    var z;
}
function f4() {
    var _a = { a: 1, b: { a: "hello", b: { a: true } } }, x = _a.a, _a_1 = _a.b, y = _a_1.a, z = _a_1.b.a;
    var x;
    var y;
    var z;
}
function f6() {
    var _a = [1, "hello"], _a_1 = _a[0], x = _a_1 === void 0 ? 0 : _a_1, _a_2 = _a[1], y = _a_2 === void 0 ? "" : _a_2;
    var x;
    var y;
}
function f7() {
    var _a = [1, "hello"], _a_1 = _a[0], x = _a_1 === void 0 ? 0 : _a_1, _a_2 = _a[1], y = _a_2 === void 0 ? 1 : _a_2; // Error, initializer for y must be string
    var x;
    var y;
}
function f8() {
    var _a = [], a = _a[0], b = _a[1], c = _a[2]; // Ok, [] is an array
    var _a_1 = [1], d = _a_1[0], e = _a_1[1], f = _a_1[2]; // Error, [1] is a tuple
}
function f9() {
    var _a = {}, a = _a[0], b = _a[1]; // Error, not array type
    var _a_1 = { 0: 10, 1: 20 }, c = _a_1[0], d = _a_1[1]; // Error, not array type
    var _a_2 = [10, 20], e = _a_2[0], f = _a_2[1];
}
function f10() {
    var _a = {}, a = _a.a, b = _a.b; // Error
    var _a_1 = [], a = _a_1.a, b = _a_1.b; // Error
}
function f11() {
    var _a = { x: 10, y: "hello" }, a = _a.x, b = _a.y;
    var _a_1 = { 0: 10, 1: "hello" }, a = _a_1[0], b = _a_1[1];
    var _a_2 = { "<": 10, ">": "hello" }, a = _a_2["<"], b = _a_2[">"];
    var _a_3 = [10, "hello"], a = _a_3[0], b = _a_3[1];
    var a;
    var b;
}
function f12() {
    var _a = [1, ["hello", { x: 5, y: true }]], a = _a[0], _a_1 = _a[1], _a_2 = _a_1 === void 0 ? ["abc", { x: 10, y: false }] : _a_1, b = _a_2[0], _a_3 = _a_2[1], x = _a_3.x, c = _a_3.y;
    var a;
    var b;
    var x;
    var c;
}
function f13() {
    var _a = [1, "hello"], x = _a[0], y = _a[1];
    var _a_1 = [[x, y], { x: x, y: y }], a = _a_1[0], b = _a_1[1];
}
function f14(_a) {
    var _a_1 = _a[0], a = _a_1 === void 0 ? 1 : _a_1, _a_2 = _a[1], _a_3 = _a_2[0], b = _a_3 === void 0 ? "hello" : _a_3, _a_4 = _a_2[1], x = _a_4.x, _a_5 = _a_4.y, c = _a_5 === void 0 ? false : _a_5;
    var a;
    var b;
    var c;
}
f14([2, ["abc", { x: 0, y: true }]]);
f14([2, ["abc", { x: 0 }]]);
f14([2, ["abc", { y: false }]]); // Error, no x
var M;
(function (M) {
    _a = [1, 2], M.a = _a[0], M.b = _a[1];
    var _a;
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
    var _a_1 = _a.a, a = _a_1 === void 0 ? "" : _a_1, _a_2 = _a.b, b = _a_2 === void 0 ? 0 : _a_2, _a_3 = _a.c, c = _a_3 === void 0 ? false : _a_3;
}
f17({});
f17({ a: "hello" });
f17({ c: true });
f17(f15());
function f18() {
    var a;
    var b;
    var aa;
    (_a = { a: a, b: b }, a = _a.a, b = _a.b, _a);
    (_a_1 = { b: b, a: a }, a = _a_1.a, b = _a_1.b, _a_1);
    _a_2 = [a, b], aa[0] = _a_2[0], b = _a_2[1];
    _a_3 = [b, a], a = _a_3[0], b = _a_3[1]; // Error
    _a_4 = [2, "def"], _a_5 = _a_4[0], a = _a_5 === void 0 ? 1 : _a_5, _a_6 = _a_4[1], b = _a_6 === void 0 ? "abc" : _a_6;
    var _a, _a_1, _a_2, _a_3, _a_4, _a_5, _a_6;
}
function f19() {
    var a, b;
    _a = [1, 2], a = _a[0], b = _a[1];
    _a_1 = [b, a], a = _a_1[0], b = _a_1[1];
    (_a_2 = { b: b, a: a }, a = _a_2.a, b = _a_2.b, _a_2);
    _a_3 = ([[2, 3]])[0], _a_4 = _a_3 === void 0 ? [1, 2] : _a_3, a = _a_4[0], b = _a_4[1];
    var x = (_a_5 = [1, 2], a = _a_5[0], b = _a_5[1], _a_5);
    var _a, _a_1, _a_2, _a_3, _a_4, _a_5;
}
function f20() {
    var a;
    var x;
    var y;
    var z;
    var _a = [1, 2, 3], a = _a.slice(0);
    var _a_1 = [1, 2, 3], x = _a_1[0], a = _a_1.slice(1);
    var _a_2 = [1, 2, 3], x = _a_2[0], y = _a_2[1], a = _a_2.slice(2);
    var _a_3 = [1, 2, 3], x = _a_3[0], y = _a_3[1], z = _a_3[2], a = _a_3.slice(3);
    _a_4 = [1, 2, 3], a = _a_4.slice(0);
    _a_5 = [1, 2, 3], x = _a_5[0], a = _a_5.slice(1);
    _a_6 = [1, 2, 3], x = _a_6[0], y = _a_6[1], a = _a_6.slice(2);
    _a_7 = [1, 2, 3], x = _a_7[0], y = _a_7[1], z = _a_7[2], a = _a_7.slice(3);
    var _a_4, _a_5, _a_6, _a_7;
}
function f21() {
    var a;
    var x;
    var y;
    var z;
    var _a = [1, "hello", true], a = _a.slice(0);
    var _a_1 = [1, "hello", true], x = _a_1[0], a = _a_1.slice(1);
    var _a_2 = [1, "hello", true], x = _a_2[0], y = _a_2[1], a = _a_2.slice(2);
    var _a_3 = [1, "hello", true], x = _a_3[0], y = _a_3[1], z = _a_3[2], a = _a_3.slice(3);
    _a_4 = [1, "hello", true], a = _a_4.slice(0);
    _a_5 = [1, "hello", true], x = _a_5[0], a = _a_5.slice(1);
    _a_6 = [1, "hello", true], x = _a_6[0], y = _a_6[1], a = _a_6.slice(2);
    _a_7 = [1, "hello", true], x = _a_7[0], y = _a_7[1], z = _a_7[2], a = _a_7.slice(3);
    var _a_4, _a_5, _a_6, _a_7;
}
