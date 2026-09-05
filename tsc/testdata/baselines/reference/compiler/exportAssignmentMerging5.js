//// [tests/cases/compiler/exportAssignmentMerging5.ts] ////

//// [a.js]
/**
 * @typedef {{x: string}} Foo
 */
module.exports = { a: 1, b: "hello" };
//// [b.js]
const a = require("./a");
const c1 = a.a;
const c2 = a.b;
/** @type {a.Foo} */
let v1 = { x: "test" };


//// [a.js]
"use strict";
/**
 * @typedef {{x: string}} Foo
 */
module.exports = { a: 1, b: "hello" };
//// [b.js]
"use strict";
const a = require("./a");
const c1 = a.a;
const c2 = a.b;
/** @type {a.Foo} */
let v1 = { x: "test" };


//// [a.d.ts]
declare const _exports: {
    a: number;
    b: string;
};
export = _exports;
/**
 * @typedef {{x: string}} Foo
 */
export type Foo = {
    x: string;
};
//// [b.d.ts]
export {};
