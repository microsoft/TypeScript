//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypedefCommentPlacement.ts] ////

//// [typedef.js]
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

//// [callback.js]
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

//// [shared.js]
export function noop() {}

/**
 * Two aliases from one comment.
 * @typedef {number} A
 * @typedef {string} B
 */

export function f() {}

//// [hosted.js]
export function noop() {}

/**
 * Documents g, not N.
 * @typedef {number} N
 * @param {N} x
 */
export function g(x) {
  return x;
}

//// [trailing.js]
export function noop() {}

/**
 * Nothing follows this one.
 * @typedef {Object} Trailing
 * @property {number} x
 */

//// [imported.js]
export function noop() {}

/**
 * Imports and defines in one comment.
 * @import {Point} from "./typedef.js"
 * @typedef {Point[]} Path
 */

export function h() {}

//// [preceded.js]
export function noop() {}

// not a JSDoc comment
/**
 * @typedef {number} Q
 */

export function i() {}

//// [generic.js]
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

//// [templateOnHost.js]
export function noop() {}

/**
 * Documents k, not a type.
 * @template T
 * @param {T} x
 */
export function k(x) { return x; }

//// [standaloneImport.js]
export function noop() {}

/**
 * Brings Point into scope.
 * @import {Point} from "./typedef.js"
 */

/** @type {Point} */
export const p = { x: 0, y: 0 };

//// [overload.js]
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

//// [documentationTags.js]
export function noop() {}

/**
 * Prose describing S.
 * @typedef {number} S
 * @see noop
 * @example
 * const s = 1;
 */

export function m() {}

//// [elidedImport.js]
export function noop() {}

/**
 * Nothing in the output uses this import.
 * @import {Point} from "./typedef.js"
 */

export function n() {}


//// [typedef.js]
export function noop() { }
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
//// [callback.js]
export function noop() { }
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
//// [shared.js]
export function noop() { }
/**
 * Two aliases from one comment.
 * @typedef {number} A
 * @typedef {string} B
 */
export function f() { }
//// [hosted.js]
export function noop() { }
/**
 * Documents g, not N.
 * @typedef {number} N
 * @param {N} x
 */
export function g(x) {
    return x;
}
//// [trailing.js]
export function noop() { }
/**
 * Nothing follows this one.
 * @typedef {Object} Trailing
 * @property {number} x
 */
//// [imported.js]
export function noop() { }
/**
 * Imports and defines in one comment.
 * @import {Point} from "./typedef.js"
 * @typedef {Point[]} Path
 */
export function h() { }
//// [preceded.js]
export function noop() { }
// not a JSDoc comment
/**
 * @typedef {number} Q
 */
export function i() { }
//// [generic.js]
export function noop() { }
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
export function j() { }
//// [templateOnHost.js]
export function noop() { }
/**
 * Documents k, not a type.
 * @template T
 * @param {T} x
 */
export function k(x) { return x; }
//// [standaloneImport.js]
export function noop() { }
/**
 * Brings Point into scope.
 * @import {Point} from "./typedef.js"
 */
/** @type {Point} */
export const p = { x: 0, y: 0 };
//// [overload.js]
export function noop() { }
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
//// [documentationTags.js]
export function noop() { }
/**
 * Prose describing S.
 * @typedef {number} S
 * @see noop
 * @example
 * const s = 1;
 */
export function m() { }
//// [elidedImport.js]
export function noop() { }
/**
 * Nothing in the output uses this import.
 * @import {Point} from "./typedef.js"
 */
export function n() { }


//// [typedef.d.ts]
export declare function noop(): void;
/**
 * A point in 2D space.
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
export type Point = {
    x: number;
    y: number;
};
/**
 * @param {Point} p
 */
export declare function dist(p: Point): number;
//// [callback.d.ts]
export declare function noop(): void;
/**
 * Compares two numbers.
 * @callback Comparator
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export type Comparator = (a: number, b: number) => number;
/**
 * @param {number[]} arr
 * @param {Comparator} cmp
 */
export declare function sortWith(arr: number[], cmp: Comparator): number[];
//// [shared.d.ts]
export declare function noop(): void;
/**
 * Two aliases from one comment.
 * @typedef {number} A
 * @typedef {string} B
 */
export type A = number;
export type B = string;
export declare function f(): void;
//// [hosted.d.ts]
export declare function noop(): void;
export type N = number;
/**
 * Documents g, not N.
 * @typedef {number} N
 * @param {N} x
 */
export declare function g(x: N): number;
//// [trailing.d.ts]
export declare function noop(): void;
/**
 * Nothing follows this one.
 * @typedef {Object} Trailing
 * @property {number} x
 */
export type Trailing = {
    x: number;
};
//// [imported.d.ts]
export declare function noop(): void;
/**
 * Imports and defines in one comment.
 * @import {Point} from "./typedef.js"
 * @typedef {Point[]} Path
 */
import type { Point } from "./typedef.js";
export type Path = Point[];
export declare function h(): void;
//// [preceded.d.ts]
export declare function noop(): void;
/**
 * @typedef {number} Q
 */
export type Q = number;
export declare function i(): void;
//// [generic.d.ts]
export declare function noop(): void;
/**
 * A named mixin.
 * @template T
 * @typedef {T & {name: string}} MixinName
 */
export type MixinName<T> = T & {
    name: string;
};
/**
 * Identity.
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */
export type Identity<T> = (x: T) => T;
export declare function j(): void;
//// [templateOnHost.d.ts]
export declare function noop(): void;
/**
 * Documents k, not a type.
 * @template T
 * @param {T} x
 */
export declare function k<T>(x: T): T;
//// [standaloneImport.d.ts]
export declare function noop(): void;
/**
 * Brings Point into scope.
 * @import {Point} from "./typedef.js"
 */
import type { Point } from "./typedef.js";
/** @type {Point} */
export declare const p: Point;
//// [overload.d.ts]
export declare function noop(): void;
export declare function l(x: string): string;
//// [documentationTags.d.ts]
export declare function noop(): void;
/**
 * Prose describing S.
 * @typedef {number} S
 * @see noop
 * @example
 * const s = 1;
 */
export type S = number;
export declare function m(): void;
//// [elidedImport.d.ts]
export declare function noop(): void;
export declare function n(): void;
