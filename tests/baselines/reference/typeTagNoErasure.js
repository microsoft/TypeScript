//// [typeTagNoErasure.js]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */

/** @type {Test<number>} */
const test = dibbity => dibbity

test(1) // ok, T=1
test('hi') // error, T=number


//// [typeTagNoErasure.js]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */
/** @type {Test<number>} */
var test = function (dibbity) { return dibbity; };
test(1); // ok, T=1
test('hi'); // error, T=number


//// [typeTagNoErasure.d.ts]
/** @template T @typedef {<T1 extends T>(data: T1) => T1} Test */
/** @type {Test<number>} */
declare const test: Test<number>;
type Test<T> = <T1 extends T>(data: T1) => T1;
