//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration6.ts] ////

//// [index.js]
/** @type {{(this: { name: string }, arg: boolean): void}} */
function fn1(arg) {
    this
}

/** @type {{(this: { name: string }, arg: boolean): void; bar: string}} */
function fn2(arg) {
    this
}

fn2.bar = ''


//// [index.js]
"use strict";
/** @type {{(this: { name: string }, arg: boolean): void}} */
function fn1(arg) {
    this;
}
/** @type {{(this: { name: string }, arg: boolean): void; bar: string}} */
function fn2(arg) {
    this;
}
fn2.bar = '';


//// [index.d.ts]
declare function fn1(this: {
    name: string;
}, arg: boolean): void;
declare function fn2(this: {
    name: string;
}, arg: boolean): void;
declare namespace fn2 {
    let bar: string;
}
