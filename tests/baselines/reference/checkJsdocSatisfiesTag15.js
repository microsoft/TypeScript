//// [tests/cases/conformance/jsdoc/checkJsdocSatisfiesTag15.ts] ////

//// [a.js]
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


//// [a.js]
/** @satisfies {(uuid: string) => void} */
export const fn1 = uuid => { };
/** @typedef {Parameters<typeof fn1>} Foo */
/** @type Foo */
export const v1 = ['abc'];
/** @type Foo */
export const v2 = [123]; // error
/** @satisfies {(a: string, ...args: never) => void} */
export const fn2 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 */
export const fn3 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export const fn4 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export const fn5 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export const fn6 = (a, b) => { };
/** @satisfies {(uuid: string) => void} */
export function fn7(uuid) { }


//// [a.d.ts]
/** @satisfies {(uuid: string) => void} */
export function fn7(uuid: any): void;
export function fn1(uuid: string): void;
/** @typedef {Parameters<typeof fn1>} Foo */
/** @type Foo */
export const v1: Foo;
/** @type Foo */
export const v2: Foo;
export function fn2(a: string, b: never): void;
export function fn3(a: string, b: never): void;
export function fn4(a: string, b: number): void;
export function fn5(a: string, b: string): void;
export function fn6(a: string, b: string | number): void;
export type Foo = Parameters<typeof fn1>;
