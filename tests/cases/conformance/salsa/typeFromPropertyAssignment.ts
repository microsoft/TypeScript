// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
var Outer = class O {
    m(x, y) { }
}
Outer.Inner = class I {
    n(a, b) { }

}
/** @type {Outer} */
var si
si.m
/** @type {Outer.Inner} */
var oi
oi.n

