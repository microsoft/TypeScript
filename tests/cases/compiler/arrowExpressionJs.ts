// @strict: true
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: mytest.js

/**
 * @template T
 * @param {T|undefined} value value or not
 * @returns {T} result value
 */
const cloneObjectGood = value => /** @type {T} */({ ...value });