// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @param {number} [p]
 * @param {number=} q
 * @param {number} [r=101]
 */
function f(p, q, r) {
    p = undefined
    q = undefined
    // note that, unlike TS, JSDOC [r=101] retains | undefined because
    // there's no code emitted to get rid of it.
    r = undefined
}
f()
f(undefined, undefined, undefined)
f(1, 2, 3)
