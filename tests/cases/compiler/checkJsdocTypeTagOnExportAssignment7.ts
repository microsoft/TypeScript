// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment7.js

// @Filename: a.js
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

const abc = { a: 1, b: 1, c: 1 };

/** @type {Foo} */
export default abc;

// @Filename: b.js
import a from "./a";
a;
