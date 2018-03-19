// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @noImplicitThis: false
// @Filename: a.js


/** @param {number} x */
function C(x) {
    this.x = x
}
var c = new C(1)
c.x = undefined // should error

/** @param {number} x */
function A(x) {
    if (!(this instanceof A)) {
        return new A(x)
    }
    this.x = x
}
var k = A(1)
var j = new A(2)
k.x === j.x
