// @allowJs: true
// @checkJs: true
// @strict: true
// @target: esnext
// @outDir: ./out
// @declaration: true
// @filename: foo.js
/**
 * foo
 *
 * @public
 * @param {object} opts
 * @param {number} opts.a
 * @param {number} [opts.b]
 * @param {number} [opts.c]
 * @returns {number}
 */
function foo({ a, b, c }) {
    return a + (b ?? 0) + (c ?? 0);
}
