// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: a.js
function A () {
    this.x = 1
    /** @type {1} */
    this.first = this.second = 1
}
/** @param {number} n */
A.prototype.y = A.prototype.z = function f(n) {
    return n + this.x
}
/** @param {number} m */
A.s = A.t = function g(m) {
    return m + this.x
}
var a = new A()
a.y('no') // error
a.z('not really') // error
A.s('still no') // error
A.t('not here either') // error
a.first = 10 // error: '10' isn't assignable to '1'
