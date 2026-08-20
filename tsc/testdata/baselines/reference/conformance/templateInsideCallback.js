//// [tests/cases/conformance/jsdoc/templateInsideCallback.ts] ////

//// [templateInsideCallback.js]
/**
 * @typedef Oops
 * @template T
 * @property {T} a
 * @property {T} b
 */
/**
 * @callback Call
 * @template T
 * @param {T} x
 * @returns {T}
 */
/**
 * @template T
 * @type {Call<T>}
 */
const identity = x => x;

/**
 * @typedef Nested
 * @property {Object} oh
 * @property {number} oh.no
 * @template T
 * @property {string} oh.noooooo
 */


/**
 * @overload
 * @template T
 * @template U
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 */
/**
 * @overload
 * @template T
 * @param {T[][]} array
 * @returns {T[]}
 */
/**
 * @param {unknown[]} array
 * @param {(x: unknown) => unknown} iterable
 * @returns {unknown[]}
 */
function flatMap(array, iterable = identity) {
  /** @type {unknown[]} */
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    result.push(.../** @type {unknown[]} */(iterable(array[i])));
  }
  return result;
}


//// [templateInsideCallback.js]
"use strict";
/**
 * @typedef Oops
 * @template T
 * @property {T} a
 * @property {T} b
 */
/**
 * @callback Call
 * @template T
 * @param {T} x
 * @returns {T}
 */
/**
 * @template T
 * @type {Call<T>}
 */
const identity = x => x;
/**
 * @typedef Nested
 * @property {Object} oh
 * @property {number} oh.no
 * @template T
 * @property {string} oh.noooooo
 */
/**
 * @overload
 * @template T
 * @template U
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 */
/**
 * @overload
 * @template T
 * @param {T[][]} array
 * @returns {T[]}
 */
/**
 * @param {unknown[]} array
 * @param {(x: unknown) => unknown} iterable
 * @returns {unknown[]}
 */
function flatMap(array, iterable = identity) {
    /** @type {unknown[]} */
    const result = [];
    for (let i = 0; i < array.length; i += 1) {
        result.push(... /** @type {unknown[]} */(iterable(array[i])));
    }
    return result;
}


//// [templateInsideCallback.d.ts]
type Oops = {
    a: T;
    b: T;
};
type Call = (x: T) => T;
/**
 * @typedef Oops
 * @template T
 * @property {T} a
 * @property {T} b
 */
/**
 * @callback Call
 * @template T
 * @param {T} x
 * @returns {T}
 */
/**
 * @template T
 * @type {Call<T>}
 */
declare const identity: Call<T>;
type Nested = {
    oh: {
        no: number;
        noooooo: string;
    };
};
declare function flatMap(array: T[], iterable: (x: T) => U[]): U[];
declare function flatMap(array: T[][]): T[];
