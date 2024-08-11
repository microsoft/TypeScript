//// [tests/cases/compiler/jsFileMethodOverloads5.ts] ////

//// [a.js]
/**
 * @overload
 * @param {string} a
 * @return {void}
 */

/**
 * @overload
 * @param {number} a
 * @param {number} [b]
 * @return {void}
 */

/**
 * @param {string | number} a
 * @param {number} [b]
 */
export const foo = function (a, b) { }




//// [a.d.ts]
/**
 * @overload
 * @param {string} a
 * @return {void}
 */
export function foo(a: string): void;
/**
 * @overload
 * @param {number} a
 * @param {number} [b]
 * @return {void}
 */
export function foo(a: number, b?: number): void;
