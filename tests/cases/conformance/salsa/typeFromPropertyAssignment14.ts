// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: def.js
var Outer = {};

// @Filename: work.js
Outer.Inner = function () {}
Outer.Inner.prototype = {
    x: 1,
    m() { }
}

// @Filename: use.js
/** @type {Outer.Inner} */
var inner
inner.x
inner.m()
var inno = new Outer.Inner()
inno.x
inno.m()


