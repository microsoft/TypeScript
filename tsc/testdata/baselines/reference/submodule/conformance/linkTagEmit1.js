//// [tests/cases/conformance/jsdoc/linkTagEmit1.ts] ////

//// [declarations.d.ts]
declare namespace NS {
    type R = number
}
//// [linkTagEmit1.js]
/** @typedef {number} N */
/**
 * @typedef {Object} D1
 * @property {1} e Just link to {@link NS.R} this time
 * @property {1} m Wyatt Earp loved {@link N integers} I bet.
 */

/** @typedef {number} Z @see N {@link N} */

/**
 * @param {number} integer {@link Z}
 */
function computeCommonSourceDirectoryOfFilenames(integer) {
    return integer + 1 // pls pls pls
}

/** {@link https://hvad} */
var see3 = true

/** @typedef {number} Attempt {@link https://wat} {@linkcode I think lingcod is better} {@linkplain or lutefisk}*/


//// [linkTagEmit1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @typedef {number} N */
/**
 * @typedef {Object} D1
 * @property {1} e Just link to {@link NS.R} this time
 * @property {1} m Wyatt Earp loved {@link N integers} I bet.
 */
/** @typedef {number} Z @see N {@link N} */
/**
 * @param {number} integer {@link Z}
 */
function computeCommonSourceDirectoryOfFilenames(integer) {
    return integer + 1; // pls pls pls
}
/** {@link https://hvad} */
var see3 = true;
/** @typedef {number} Attempt {@link https://wat} {@linkcode I think lingcod is better} {@linkplain or lutefisk}*/


//// [linkTagEmit1.d.ts]
export type N = number;
export type D1 = {
    e: 1;
    m: 1;
};
export type Z = number;
export type Attempt = number;
/** @typedef {number} Attempt {@link https://wat} {@linkcode I think lingcod is better} {@linkplain or lutefisk}*/
