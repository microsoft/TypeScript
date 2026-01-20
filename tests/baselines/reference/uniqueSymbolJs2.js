//// [tests/cases/compiler/uniqueSymbolJs2.ts] ////

//// [index.js]
/** @type {unique symbol} */
const x = Symbol()
/** @type {unique symbol} */
const y = Symbol()

/** @type {typeof x} */
let z = x

z == y // error

//// [index.js]
"use strict";
/** @type {unique symbol} */
var x = Symbol();
/** @type {unique symbol} */
var y = Symbol();
/** @type {typeof x} */
var z = x;
z == y; // error


//// [index.d.ts]
/** @type {unique symbol} */
declare const x: unique symbol;
/** @type {unique symbol} */
declare const y: unique symbol;
/** @type {typeof x} */
declare let z: typeof x;
