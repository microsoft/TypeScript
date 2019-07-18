//// [index.js]
/** @type {?} */
export const a = null;

/** @type {*} */
export const b = null;

/** @type {string?} */
export const c = null;

/** @type {string=} */
export const d = null;

/** @type {string!} */
export const e = null;

/** @type {function(string, number): object} */
export const f = null;

/** @type {function(new: object, string, number)} */
export const g = null;

/** @type {Object.<string, number>} */
export const h = null;


//// [index.js]
"use strict";
exports.__esModule = true;
/** @type {?} */
exports.a = null;
/** @type {*} */
exports.b = null;
/** @type {string?} */
exports.c = null;
/** @type {string=} */
exports.d = null;
/** @type {string!} */
exports.e = null;
/** @type {function(string, number): object} */
exports.f = null;
/** @type {function(new: object, string, number)} */
exports.g = null;
/** @type {Object.<string, number>} */
exports.h = null;


//// [index.d.ts]
export const a: unknown;
export const b: any;
export const c: string | null;
export const d: string | undefined;
export const e: string;
export const f: (arg0: string, arg1: number) => object;
export const g: new (arg1: string, arg2: number) => object;
export const h: {
    [index: string]: number;
};
