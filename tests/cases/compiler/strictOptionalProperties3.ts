// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: a.js

/**
 * @typedef {object} A
 * @property {number} [value]
 */

/** @type {A} */
const a = { value: undefined }; // error

/**
 * @typedef {{ value?: number }} B
 */

/** @type {B} */
const b = { value: undefined }; // error
