//// [tests/cases/compiler/unusedDestructuring.ts] ////

//// [unusedDestructuring.ts]
export {};
declare const o: any;
const { a, b } = o;
const { c, d }  = o;
d;
const { e } = o;
const { f: g } = o;
const { h } = o, { i } = o;

function f({ a, b }, { c, d }, { e }) {
    d;
}


//// [unusedDestructuring.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = o.a, b = o.b;
var c = o.c, d = o.d;
d;
var e = o.e;
var g = o.f;
var h = o.h, i = o.i;
function f(_a, _b, _c) {
    var a = _a.a, b = _a.b;
    var c = _b.c, d = _b.d;
    var e = _c.e;
    d;
}
