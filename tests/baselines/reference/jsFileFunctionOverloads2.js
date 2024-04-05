//// [tests/cases/compiler/jsFileFunctionOverloads2.ts] ////

//// [jsFileFunctionOverloads2.js]
// Also works if all @overload tags are combined in one comment.
/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 *
 * @overload
 * @param {string} x
 * @returns {'string'}
 *
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 *
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
 *
 * @overload
 * @param {T[][]} array
 * @returns {T[]}
 *
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


//// [jsFileFunctionOverloads2.js]
// Also works if all @overload tags are combined in one comment.
/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 *
 * @overload
 * @param {string} x
 * @returns {'string'}
 *
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 *
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
var identity = function (x) { return x; };
/**
 * @template T
 * @template U
 * @overload
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 *
 * @overload
 * @param {T[][]} array
 * @returns {T[]}
 *
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


//// [jsFileFunctionOverloads2.d.ts]
/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 *
 * @overload
 * @param {string} x
 * @returns {'string'}
 *
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 *
 * @param {unknown} x
 * @returns {string}
 */
declare function getTypeName(x: number): "number";
/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 *
 * @overload
 * @param {string} x
 * @returns {'string'}
 *
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 *
 * @param {unknown} x
 * @returns {string}
 */
declare function getTypeName(x: string): "string";
/**
 * @overload
 * @param {number} x
 * @returns {'number'}
 *
 * @overload
 * @param {string} x
 * @returns {'string'}
 *
 * @overload
 * @param {boolean} x
 * @returns {'boolean'}
 *
 * @param {unknown} x
 * @returns {string}
 */
declare function getTypeName(x: boolean): "boolean";
/**
 * @template T
 * @template U
 * @overload
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 *
 * @overload
 * @param {T[][]} array
 * @returns {T[]}
 *
 * @param {unknown[]} array
 * @param {(x: unknown) => unknown} iterable
 * @returns {unknown[]}
 */
declare function flatMap<T, U>(array: T[], iterable: (x: T) => U[]): U[];
/**
 * @template T
 * @template U
 * @overload
 * @param {T[]} array
 * @param {(x: T) => U[]} iterable
 * @returns {U[]}
 *
 * @overload
 * @param {T[][]} array
 * @returns {T[]}
 *
 * @param {unknown[]} array
 * @param {(x: unknown) => unknown} iterable
 * @returns {unknown[]}
 */
declare function flatMap<T, U>(array: T[][]): T[];
/**
 * @template T
 * @param {T} x
 * @returns {T}
 */
declare function identity<T>(x: T): T;
