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
var identity = function (x) { return x; };
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
function flatMap(array, iterable) {
    if (iterable === void 0) { iterable = identity; }
    /** @type {unknown[]} */
    var result = [];
    for (var i = 0; i < array.length; i += 1) {
        result.push.apply(result, /** @type {unknown[]} */ (iterable(array[i])));
    }
    return result;
}


//// [templateInsideCallback.d.ts]
/**
 * @overload
 * @template T
 * @template U
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 */
declare function flatMap<U>(): any;
/**
 * @overload
 * @template T
 * @param {T[][]} array
 * @returns {T[]}
 */
declare function flatMap(): any;
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
type Oops = any;
type Call = () => any;
