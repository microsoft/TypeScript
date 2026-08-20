//// [tests/cases/conformance/jsdoc/callbackTagVariadicType.ts] ////

//// [callbackTagVariadicType.js]
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */

/** @type {Foo} */
export const x = () => 1
var res = x('a', 'b')


//// [callbackTagVariadicType.js]
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
/** @type {Foo} */
export const x = () => 1;
var res = x('a', 'b');


//// [callbackTagVariadicType.d.ts]
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
export type Foo = (...args: string) => number;
/** @type {Foo} */
export declare const x: Foo;
