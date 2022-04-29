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
// incremental assignments still work
Outer.Inner.prototype.j = 2
/** @type {string} */
Outer.Inner.prototype.k;
var inner = new Outer.Inner()
inner.m()
inner.i
inner.j
inner.k
