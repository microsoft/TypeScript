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
        result.push(... /** @type {unknown[]} */iterable(array[i]));
    }
    return result;
}


//// [jsFileFunctionOverloads2.d.ts]
declare function getTypeName(x: number): 'number';
declare function getTypeName(x: string): 'string';
declare function getTypeName(x: boolean): 'boolean';
/**
 * @template T
 * @param {T} x
 * @returns {T}
 */
declare const identity: <T>(x: T) => T;
declare function flatMap<T, U>(array: T[], iterable: (x: T) => U[]): U[];
declare function flatMap(array: T[][]): T[];


//// [DtsFileErrors]


dist/jsFileFunctionOverloads2.d.ts(11,33): error TS2304: Cannot find name 'T'.
dist/jsFileFunctionOverloads2.d.ts(11,41): error TS2304: Cannot find name 'T'.


==== dist/jsFileFunctionOverloads2.d.ts (2 errors) ====
    declare function getTypeName(x: number): 'number';
    declare function getTypeName(x: string): 'string';
    declare function getTypeName(x: boolean): 'boolean';
    /**
     * @template T
     * @param {T} x
     * @returns {T}
     */
    declare const identity: <T>(x: T) => T;
    declare function flatMap<T, U>(array: T[], iterable: (x: T) => U[]): U[];
    declare function flatMap(array: T[][]): T[];
                                    ~
!!! error TS2304: Cannot find name 'T'.
                                            ~
!!! error TS2304: Cannot find name 'T'.
    