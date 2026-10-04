// @checkJs: true
// @noEmit: true

// @filename: set.js
/**
 * @template D
 * @typedef {(a: D, b: D) => number} SomeUnrelatedGeneric
 */

/**
 * @template T
 */
class SomeGenericClass {
  /**
   * @param {Set<T>} param
   */
  constructor(param) {}
}

module.exports = SomeGenericClass;

// @filename: index.js
const Set = require("./set");

/** @typedef {Set<string>} MyDefinedType */
