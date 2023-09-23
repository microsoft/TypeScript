//// [tests/cases/compiler/mapOnTupleTypes01.ts] ////

//// [mapOnTupleTypes01.ts]
export let mapOnLooseArrayLiteral = [1, 2, 3, 4].map(n => n * n);

// Length 1

let numTuple: [number] = [1];
export let a = numTuple.map(x => x * x);

// Length 2

let numNum: [number, number] = [    100,     100];
let strStr: [string, string] = ["hello", "hello"];
let numStr: [number, string] = [    100, "hello"];

export let b = numNum.map(n => n * n);
export let c = strStr.map(s => s.charCodeAt(0));
export let d = numStr.map(x => x);

// Length 3

let numNumNum: [number, number, number] = [1, 2, 3];

export let e = numNumNum.map(n => n * n);

// Length 4

let numNumNumNum: [number, number, number, number] = [1, 2, 3, 4];

export let f = numNumNumNum.map(n => n * n);

// Length 5

let numNumNumNumNum: [number, number, number, number, number] = [1, 2, 3, 4, 5];

export let g = numNumNumNumNum.map(n => n * n);


// Length 6

let numNumNumNumNumNum: [number, number, number, number, number, number] = [1, 2, 3, 4, 5, 6];

export let h = numNumNumNumNum.map(n => n * n);

//// [mapOnTupleTypes01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = exports.g = exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = exports.mapOnLooseArrayLiteral = void 0;
exports.mapOnLooseArrayLiteral = [1, 2, 3, 4].map(function (n) { return n * n; });
// Length 1
var numTuple = [1];
exports.a = numTuple.map(function (x) { return x * x; });
// Length 2
var numNum = [100, 100];
var strStr = ["hello", "hello"];
var numStr = [100, "hello"];
exports.b = numNum.map(function (n) { return n * n; });
exports.c = strStr.map(function (s) { return s.charCodeAt(0); });
exports.d = numStr.map(function (x) { return x; });
// Length 3
var numNumNum = [1, 2, 3];
exports.e = numNumNum.map(function (n) { return n * n; });
// Length 4
var numNumNumNum = [1, 2, 3, 4];
exports.f = numNumNumNum.map(function (n) { return n * n; });
// Length 5
var numNumNumNumNum = [1, 2, 3, 4, 5];
exports.g = numNumNumNumNum.map(function (n) { return n * n; });
// Length 6
var numNumNumNumNumNum = [1, 2, 3, 4, 5, 6];
exports.h = numNumNumNumNum.map(function (n) { return n * n; });


//// [mapOnTupleTypes01.d.ts]
export declare let mapOnLooseArrayLiteral: number[];
export declare let a: number[];
export declare let b: number[];
export declare let c: number[];
export declare let d: (string | number)[];
export declare let e: number[];
export declare let f: number[];
export declare let g: number[];
export declare let h: number[];
