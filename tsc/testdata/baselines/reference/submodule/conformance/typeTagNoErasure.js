//// [tests/cases/conformance/jsdoc/typeTagNoErasure.ts] ////

//// [typeTagNoErasure.js]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */

/** @type {Test<number>} */
const test = dibbity => dibbity

test(1) // ok, T=1
test('hi') // error, T=number


//// [typeTagNoErasure.js]
"use strict";
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {Test<number>} */
const test = dibbity => dibbity;
test(1); // ok, T=1
test('hi'); // error, T=number


//// [typeTagNoErasure.d.ts]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */
export type Test<T> = <T1 extends T>(data: T1) => T1;
