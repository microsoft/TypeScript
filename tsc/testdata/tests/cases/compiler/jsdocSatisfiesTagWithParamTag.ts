// @target: es2015
// @strict: true
// @allowJS: true
// @checkJs: true
// @declaration: true
// @outDir: lib

// @filename: /a.js

/** 
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export const fn1 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export const fn2 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export const fn3 = (a, b) => {};
