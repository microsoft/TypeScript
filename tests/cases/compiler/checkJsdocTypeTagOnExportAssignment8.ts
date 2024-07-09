// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment8.js

// @Filename: a.js
/**
 * @typedef Foo
 * @property {string} a
 * @property {'b'} b
 */

/** @type {Foo} */
export default {
    a: 'a',
    b: 'b'
}
