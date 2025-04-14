// @allowJs: true
// @outDir: dist/
// @declaration: true
// @filename: jsFileFunctionOverloads.js

/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 */
/**
 * @overload
 * @param {string} x
 * @returns {'string'}
 */
/**
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 */
/**
 * @param {unknown} x
 * @returns {string}
 */
 function getTypeName(x) {
  return typeof x;
}

/**
 * @template T
 * @param {T} x 
 * @returns {T}
 */
const identity = x => x;

/**
 * @template T
 * @template U
 * @overload
 * @param {T[]} array 
 * @param {(x: T) => U[]} iterable 
 * @returns {U[]}
 */
/**
 * @template T
 * @overload
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
