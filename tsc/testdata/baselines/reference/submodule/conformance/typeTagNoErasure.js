//// [tests/cases/conformance/jsdoc/typeTagNoErasure.ts] ////

//// [typeTagNoErasure.js]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */

/** @type {Test<number>} */
const test = dibbity => dibbity

test(1) // ok, T=1
test('hi') // error, T=number


//// [typeTagNoErasure.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */
/** @type {Test<number>} */
const test = dibbity => dibbity;
test(1); // ok, T=1
test('hi'); // error, T=number


//// [typeTagNoErasure.d.ts]
export type Test<T> = <T1 extends T>(data: T1) => T1;
