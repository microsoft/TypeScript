// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
var Outer = {};

Outer.Inner = class {
    constructor() {
        this.x = 1
    }
    m() { }
}

/** @type {Outer.Inner} */
var inner
inner.x
inner.m()
var inno = new Outer.Inner()
inno.x
inno.m()
