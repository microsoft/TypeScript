//// [index.js]
export {}; // flag file as module
/**
 * @typedef {string | number | symbol} PropName 
 */

/**
 * Callback
 *
 * @callback NumberToStringCb
 * @param {number} a
 * @returns {string}
 */

/**
 * @template T
 * @typedef {T & {name: string}} MixinName 
 */

/**
 * Identity function
 *
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */


//// [index.js]
"use strict";
exports.__esModule = true;
/**
 * @typedef {string | number | symbol} PropName
 */
/**
 * Callback
 *
 * @callback NumberToStringCb
 * @param {number} a
 * @returns {string}
 */
/**
 * @template T
 * @typedef {T & {name: string}} MixinName
 */
/**
 * Identity function
 *
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */


//// [index.d.ts]
export type PropName = string | number | symbol;
export type NumberToStringCb = (a: number) => string;
export type MixinName<T> = T & {
    name: string;
};
export type Identity<T> = (x: T) => T;
