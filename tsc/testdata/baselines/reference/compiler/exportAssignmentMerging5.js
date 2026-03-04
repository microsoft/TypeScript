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
export type Foo = {
    x: string;
};
/**
 * @typedef {{x: string}} Foo
 */
declare const _default: {
    a: number;
    b: string;
};
export = _default;
//// [b.d.ts]
export {};
