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
const foo1 = value => /** @type {string} */({ ...value });

/**
 * @template T
 * @param {T|undefined} value value or not
 * @returns {T} result value
 */
const foo2 = value => /** @type {string} */(/** @type {T} */({ ...value }));