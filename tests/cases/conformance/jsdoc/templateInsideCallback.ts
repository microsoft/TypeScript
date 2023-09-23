// @checkJs: true
// @strict: true
// @outDir: dist/
// @declaration: true
// @filename: templateInsideCallback.js
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
