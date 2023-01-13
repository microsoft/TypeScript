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
 * @property {"a" | "b"} a
 */

/**
 * @typedef {(x: string) => string} T3
 */

/**
 * @typedef {Object} T4
 * @property {string} a
 */

const t1 = /** @satisfies {T1} */ ({ a: 1 });
const t2 = /** @satisfies {T1} */ ({ a: 1, b: 1 });
const t3 = /** @satisfies {T1} */ ({});

/** @type {T2} */
const t4 = /** @satisfies {T2} */ ({ a: "a" });

/** @type {(m: string) => string} */
const t5 = /** @satisfies {T3} */((m) => m.substring(0));
const t6 = /** @satisfies {[number, number]} */ ([1, 2]);
const t7 = /** @satisfies {T4} */ ({ a: 'test' });
const t8 = /** @satisfies {T4} */ ({ a: 'test', b: 'test' });
