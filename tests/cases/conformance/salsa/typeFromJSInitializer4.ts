// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: false
// @noImplicitAny: true
// @Filename: a.js

/** @type {number | undefined} */
var n;

// should get any on parameter initialisers
function f(a = null, b = n, l = []) {
    // a should be any
    a = undefined
    a = null
    a = 1
    a = true
    a = {}
    a = 'ok'

    // b should be number | undefined, not any
    b = 1
    b = undefined
    b = 'error'

    // l should be any[]
    l.push(1)
    l.push('ok')
}
