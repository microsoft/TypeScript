// @strict: true
// @allowJS: true
// @checkJs: true
// @declaration: true
// @outDir: lib

// @filename: /a.js

/** @satisfies {(uuid: string) => void} */
export const fn1 = uuid => {};

/** @typedef {Parameters<typeof fn1>} Foo */

/** @type Foo */
export const v1 = ['abc'];
/** @type Foo */
export const v2 = [123]; // error

/** @satisfies {(a: string, ...args: never) => void} */
export const fn2 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 */
export const fn3 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export const fn4 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export const fn5 = (a, b) => {};

/** 
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export const fn6 = (a, b) => {};

/** @satisfies {(uuid: string) => void} */
export function fn7(uuid) {}
