//// [tests/cases/compiler/exportAssignmentMerging6.ts] ////

//// [a.js]
/**
 * @typedef {{x: string}} Foo
 */
export const x = 1; // Causes error
module.exports = { a: 1, b: "hello" };
//// [b.js]
const a = require("./a");
const c1 = a.a;
const c2 = a.b;
/** @type {a.Foo} */
let v1 = { x: "test" };


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/**
 * @typedef {{x: string}} Foo
 */
exports.x = 1; // Causes error
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
export declare const x = 1;
//// [b.d.ts]
export {};
