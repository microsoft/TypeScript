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
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/** @type {Foo} */
var x = function () { return 1; };
exports.x = x;
var res = (0, exports.x)('a', 'b');


//// [callbackTagVariadicType.d.ts]
/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */
/** @type {Foo} */
export const x: Foo;
export type Foo = (...args: string[]) => number;
