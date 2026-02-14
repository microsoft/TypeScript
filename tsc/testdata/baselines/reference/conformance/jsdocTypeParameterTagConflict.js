//// [tests/cases/conformance/jsdoc/jsdocTypeParameterTagConflict.ts] ////

//// [a.js]
// @type on a function is applicable when there are no preceding @param, @return, or @template annotations
// and no @type parameter annotations.

// @param for a parameter is applicable when there is no applicable @type annotation for the function and
// no @type annotation on the parameter.

// @return is applicable when there is no applicable @type annotation for the function.

// @template is applicable when there is no applicable @type annotation for the function.

/**
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 * @return {string}
 */
function f1(/** @type {5}*/ a, b) { return "abc" }

/**
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 * @return {string}
 */
function f2(a, b) { return 42 }

/**
 * @param {3} a
 * @type {(a: 1, b: 2) => number}
 * @param {4} b
 * @return {string}
 */
function f3(a, b) { return "abc" }

/**
 * @return {string}
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 */
function f4(a, b) { return "abc" }

/**
 * @type {(a: 1, b: 2) => number}
 * @template T
 * @template U
 * @param {T} a
 * @param {U} b
 * @return {string}
 */
function f5(a, b) { return 42 }

/**
 * @template T
 * @type {(a: 1, b: 2) => number}
 * @template U
 * @param {T} a
 * @param {U} b
 * @return {string}
 */
function f6(a, b) { return "abc" }

/**
 * @param {1} a
 * @param {2} a
 */
function f7(a) {}




//// [a.d.ts]
/**
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 * @return {string}
 */
declare function f1(/** @type {5}*/ a: 5, b: 4): string;
/**
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 * @return {string}
 */
declare function f2(a: 1, b: 2): number;
/**
 * @param {3} a
 * @type {(a: 1, b: 2) => number}
 * @param {4} b
 * @return {string}
 */
declare function f3(a: 3, b: 4): string;
/**
 * @return {string}
 * @type {(a: 1, b: 2) => number}
 * @param {3} a
 * @param {4} b
 */
declare function f4(a: 3, b: 4): string;
/**
 * @type {(a: 1, b: 2) => number}
 * @template T
 * @template U
 * @param {T} a
 * @param {U} b
 * @return {string}
 */
declare function f5(a: 1, b: 2): number;
/**
 * @template T
 * @type {(a: 1, b: 2) => number}
 * @template U
 * @param {T} a
 * @param {U} b
 * @return {string}
 */
declare function f6<T, U>(a: T, b: U): string;
/**
 * @param {1} a
 * @param {2} a
 */
declare function f7(a: 1): void;
