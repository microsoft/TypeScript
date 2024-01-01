// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @template out T
 * @typedef {Object} Covariant
 * @property {T} x
 */

/**
 * @type {Covariant<unknown>}
 */
let super_covariant = { x: 1 };

/**
 * @type {Covariant<string>}
 */
let sub_covariant = { x: '' };

super_covariant = sub_covariant;
sub_covariant   = super_covariant; // Error

/**
 * @template in T
 * @typedef {Object} Contravariant
 * @property {(x: T) => void} f
 */

/**
 * @type {Contravariant<unknown>}
 */
let super_contravariant = { f: (x) => {} };

/**
 * @type {Contravariant<string>}
 */
let sub_contravariant = { f: (x) => {} };

super_contravariant = sub_contravariant;  // Error
sub_contravariant = super_contravariant;

/**
 * @template in out T
 * @typedef {Object} Invariant
 * @property {(x: T) => T} f
 */

/**
 * @type {Invariant<unknown>}
 */
let super_invariant = { f: (x) => {} };

/**
 * @type {Invariant<string>}
 */
let sub_invariant = { f: (x) => { return "" } };

super_invariant = sub_invariant;  // Error
sub_invariant = super_invariant;  // Error

/**
 * @template in T
 * @param {T} x
 */
function f(x) {}
