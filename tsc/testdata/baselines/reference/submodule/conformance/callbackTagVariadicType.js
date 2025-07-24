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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
/** @type {Foo} */
const x = () => 1;
exports.x = x;
var res = (0, exports.x)('a', 'b');


//// [callbackTagVariadicType.d.ts]
export type Foo = (...args: string) => number;
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
/** @type {Foo} */
export declare const x: Foo;
