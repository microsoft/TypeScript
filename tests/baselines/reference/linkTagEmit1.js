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
declare function computeCommonSourceDirectoryOfFilenames(integer: number): number;
/** {@link https://hvad} */
declare var see3: boolean;
type N = number;
type D1 = {
    /**
     * Just link to {@link NS.R} this time
     */
    e: 1;
    /**
     * Wyatt Earp loved {@link N integers} I bet.
     */
    m: 1;
};
type Z = number;
/**
 * {@link https://wat} {@linkcode I think lingcod is better} {@linkplain or lutefisk}
 */
type Attempt = number;
