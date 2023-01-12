// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/**
 * @typedef {Object} T1
 * @property {number} a
 */

/**
 * @typedef {Object} T2
 * @property {string} a
 */

/**
 * @typedef {Object} T3
 * @property {"a" | "b"} a
 */

/**
 * @satisfies {T1}
 */
const t1 = { a: 1 };

/**
 * @satisfies {T1}
 */
const t2 = { a: 1, b: 1 };

/**
 * @satisfies {T1}
 */
const t3 = {};

/**
 * @satisfies {Array.<number, number>}
 */
const t4 = [1, 2];

/**
 * @satisfies {T2}
 */
const t5 = { a: 'test' };

/**
 * @satisfies {T2}
 */
const t6 = { a: 'test', b: 'test' };

/**
 * @satisfies {T3}
 */
const t7 = { a: "a" };

/** @satisfies {string} */ const t8 = (1);
