// @strict: true
// @checkJs: true
// @noEmit: true

// @filename: index.js

/**
 * @typedef {(a: string, b: number) => void} Fn
 */

/** @type {Fn} */
const fn1 =
  /**
   * @param [b]
   */
  function self(a, b) {
    b;
    self("");
    self("", undefined);
  };

/** @type {Fn} */
const fn2 =
  /**
   * @param {number} [b]
   */
  function self(a, b) {
    b;
    self("");
    self("", undefined);
  };
