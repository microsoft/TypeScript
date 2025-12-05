// @strict: true
// @checkJs: true
// @noEmit: true

// @filename: index.js

/**
 * 
 * @param {number} num 
 */
function acceptNum(num) {}

/**
 * @typedef {(a: string, b: number) => void} Fn
 */

/** @type {Fn} */
const fn1 =
  /**
   * @param [b]
   */
  function self(a, b) {
    acceptNum(b); // error
    self("");
    self("", undefined);
  };

/** @type {Fn} */
const fn2 =
  /**
   * @param {number} [b]
   */
  function self(a, b) {
    acceptNum(b); // error
    self("");
    self("", undefined);
  };
