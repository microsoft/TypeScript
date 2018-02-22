// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: module.js
var Outer = {}
Outer.Inner = function() {}
Outer.Inner.prototype = {
    m() { },
    i: 1
}
// NOTE: incremental assignments don't work (but don't need to for chrome at least)
Outer.Inner.prototype.j = 2
var inner = new Outer.Inner()
inner.m()
inner.i
inner.j
