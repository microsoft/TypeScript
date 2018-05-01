//// [unusedDestructuring.ts]
export {};
declare const o: any;
const { a, b } = o;
const { c, d }  = o;
d;
const { e } = o;

function f({ a, b }, { c, d }, { e }) {
    d;
}


//// [unusedDestructuring.js]
"use strict";
exports.__esModule = true;
var a = o.a, b = o.b;
var c = o.c, d = o.d;
d;
var e = o.e;
function f(_a, _b, _c) {
    var a = _a.a, b = _a.b;
    var c = _b.c, d = _b.d;
    var e = _c.e;
    d;
}
