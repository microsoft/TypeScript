// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment1.js

// @Filename: a.js
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

/** @type {Foo} */
export default { c: false };

// @Filename: b.js
import a from "./a";
a;
