// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
var Outer = function O() {
    this.y = 2
}
Outer.Inner = class I {
    constructor() {
        this.x = 1
    }
}
/** @type {Outer} */
var ja
ja.y
/** @type {Outer.Inner} */
var da
da.x
