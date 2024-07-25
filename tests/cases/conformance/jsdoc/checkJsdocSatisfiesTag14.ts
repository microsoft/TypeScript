// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js

/**
 * @typedef {Object} T1
 * @property {number} a
 */

/**
 * @satisfies T1
 */
const t1 = { a: 1 };
const t2 = /** @satisfies T1 */ ({ a: 1 });
