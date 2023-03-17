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
export function foo(a: string): void;
export function foo(a: number, b?: number): void;
