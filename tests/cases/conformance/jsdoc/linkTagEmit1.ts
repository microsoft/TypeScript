// @checkJs: true
// @outdir: foo
// @declaration: true
// @filename: declarations.d.ts
declare namespace NS {
    type R = number
}
// @filename: linkTagEmit1.js
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
