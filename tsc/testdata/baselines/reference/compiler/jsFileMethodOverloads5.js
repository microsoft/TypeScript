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
export declare const foo: (a: string | number, b?: number) => void;
