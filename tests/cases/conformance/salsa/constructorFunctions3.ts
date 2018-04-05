// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: a.js
function Instance() {
    this.i = 'simple'
}
var i = new Instance();
Instance;
i;

function StaticToo() {
    this.i = 'more complex'
}
StaticToo.property = 'yep'
var s = new StaticToo();
s;
StaticToo;

// Both!
function A () {
    this.x = 1
    /** @type {1} */
    this.second = 1
}
/** @param {number} n */
A.prototype.z = function f(n) {
    return n + this.x
}
/** @param {number} m */
A.t = function g(m) {
    return m + 1
}
var a = new A()
a.z(3)
A.t(2)
a.second = 1
