// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment6.js

// @Filename: a.js
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

/** @type {Foo} */
export default { a: 1, b: 1, c: 1 };

// @Filename: b.js
import a from "./a";
a;
