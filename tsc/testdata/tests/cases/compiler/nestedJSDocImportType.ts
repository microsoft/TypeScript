// @checkJs: true
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: a.js
/** @typedef {string} A */

// @Filename: b.js
module.exports = {
  create() {
    /** @param {import("./a").A} x */
    function f(x) {}
    return f("hi");
  }
}