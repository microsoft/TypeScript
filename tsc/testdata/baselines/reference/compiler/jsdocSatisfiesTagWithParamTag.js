//// [tests/cases/compiler/jsdocSatisfiesTagWithParamTag.ts] ////

//// [a.js]
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


//// [a.js]
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export const fn1 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export const fn2 = (a, b) => { };
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export const fn3 = (a, b) => { };


//// [a.d.ts]
/**
 * @satisfies {(a: string, ...args: never) => void}
 * @param {string} a
 * @param {number} b
 */
export declare const fn1: (a: string, b: number) => void;
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string} b
 */
export declare const fn2: (a: string, b: string) => void;
/**
 * @satisfies {(a: string, ...args: number[]) => void}
 * @param {string} a
 * @param {string | number} b
 */
export declare const fn3: (a: string, b: string | number) => void;
