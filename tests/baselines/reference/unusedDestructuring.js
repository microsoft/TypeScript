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
const { a, b } = o;
const { c, d } = o;
d;
const { e } = o;
const { f: g } = o;
const { h } = o, { i } = o;
function f({ a, b }, { c, d }, { e }) {
    d;
}
