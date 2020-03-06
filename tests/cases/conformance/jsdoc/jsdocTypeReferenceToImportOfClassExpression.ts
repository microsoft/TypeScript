// @noEmit: true
// @allowjs: true
// @checkjs: true

// @Filename: MW.js
/** @typedef {import("./MC")} MC */

class MW {
  /**
   * @param {MC} compiler the compiler
   */
  constructor(compiler) {
    this.compiler = compiler;
  }
}

module.exports = MW;

// @Filename: MC.js
const MW = require("./MW");

/** @typedef {number} Cictema */

module.exports = class MC {
  watch() {
    return new MW(this);
  }
};
