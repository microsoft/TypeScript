// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
function Outer() {
    this.y = 2
}
Outer.Inner = class I {
    constructor() {
        this.x = 1
    }
}
/** @type {Outer} */
var ok
ok.y
/** @type {Outer.Inner} */
var oc
oc.x
