// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment3.js

// @Filename: a.js
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

const bar = { c: 1 };

/** @type {Foo} */
export default bar;

// @Filename: b.js
import a from "./a";
a;
