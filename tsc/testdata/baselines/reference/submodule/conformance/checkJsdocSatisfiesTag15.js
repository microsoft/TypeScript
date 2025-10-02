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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn6 = exports.fn5 = exports.fn4 = exports.fn3 = exports.fn2 = exports.v2 = exports.v1 = exports.fn1 = void 0;
exports.fn7 = fn7;
/** @satisfies {(uuid: string) => void} */
exports.fn1 = uuid => { };
/** @typedef {Parameters<typeof fn1>} Foo */
/** @type Foo */
exports.v1 = ['abc'];
/** @type Foo */
exports.v2 = [123]; // error
/** @satisfies {(a: string, ...args: never) => void} */
exports.fn2 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 */
exports.fn3 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
exports.fn4 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
exports.fn5 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
exports.fn6 = (a, b) => { };
/** @satisfies {(uuid: string) => void} */
function fn7(uuid) { }


//// [a.d.ts]
/** @satisfies {(uuid: string) => void} */
export declare const fn1: (uuid: string) => void;
export type Foo = Parameters<typeof fn1>;
/** @typedef {Parameters<typeof fn1>} Foo */
/** @type Foo */
export declare const v1: Foo;
/** @type Foo */
export declare const v2: Foo;
/** @satisfies {(a: string, ...args: never) => void} */
export declare const fn2: (a: string, b: never) => void;
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 */
export declare const fn3: (a: string, b: never) => void;
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export declare const fn4: (a: string, b: never) => void;
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export declare const fn5: (a: string, b: number) => void;
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export declare const fn6: (a: string, b: number) => void;
/** @satisfies {(uuid: string) => void} */
export declare function fn7(uuid: any): void;
