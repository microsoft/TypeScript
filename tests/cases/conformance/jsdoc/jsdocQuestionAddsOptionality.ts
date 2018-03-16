// @Filename: a.js
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
/** @param {?number} a */
function f(a) {
    a = 1
    a = null
    a = undefined // should not be allowed
}
f()
f(null)
f(undefined) // should not be allowed
f(1)

/** @param {number?} a */
function g(a) {
    a = 1
    a = null
    a = undefined // should not be allowed
}
g()
g(null)
g(undefined) // should not be allowed
g(1)
