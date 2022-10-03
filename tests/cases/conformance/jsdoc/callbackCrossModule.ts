// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js
/** @callback Con - some kind of continuation
 * @param {object | undefined} error
 * @return {any} I don't even know what this should return
 */
module.exports = C
function C() {
    this.p = 1
}

// @Filename: use.js
/** @param {import('./mod1').Con} k */
function f(k) {
    if (1 === 2 - 1) {
        // I guess basic math works!
    }
    return k({ ok: true})
}

