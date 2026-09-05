// @target: es2015
// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: typedef.js

export function noop() {}

/**
 * A point in 2D space.
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Point} p
 */
export function dist(p) {
  return p.x;
}

// @filename: callback.js

export function noop() {}

/**
 * Compares two numbers.
 * @callback Comparator
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */

/**
 * @param {number[]} arr
 * @param {Comparator} cmp
 */
export function sortWith(arr, cmp) {
  return arr.slice().sort(cmp);
}

// @filename: shared.js

export function noop() {}

/**
 * Two aliases from one comment.
 * @typedef {number} A
 * @typedef {string} B
 */

export function f() {}

// @filename: hosted.js

export function noop() {}

/**
 * Documents g, not N.
 * @typedef {number} N
 * @param {N} x
 */
export function g(x) {
  return x;
}

// @filename: trailing.js

export function noop() {}

/**
 * Nothing follows this one.
 * @typedef {Object} Trailing
 * @property {number} x
 */

// @filename: imported.js

export function noop() {}

/**
 * Imports and defines in one comment.
 * @import {Point} from "./typedef.js"
 * @typedef {Point[]} Path
 */

export function h() {}

// @filename: preceded.js

export function noop() {}

// not a JSDoc comment
/**
 * @typedef {number} Q
 */

export function i() {}

// @filename: generic.js

export function noop() {}

/**
 * A named mixin.
 * @template T
 * @typedef {T & {name: string}} MixinName
 */

/**
 * Identity.
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */

export function j() {}

// @filename: templateOnHost.js

export function noop() {}

/**
 * Documents k, not a type.
 * @template T
 * @param {T} x
 */
export function k(x) { return x; }

// @filename: standaloneImport.js

export function noop() {}

/**
 * Brings Point into scope.
 * @import {Point} from "./typedef.js"
 */

/** @type {Point} */
export const p = { x: 0, y: 0 };

// @filename: overload.js

export function noop() {}

/**
 * Takes a string.
 * @overload
 * @param {string} x
 * @returns {string}
 */

/**
 * @param {any} x
 */
export function l(x) { return x; }
