// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: module.js
var Inner = function() {}
Inner.prototype = {
    m() { },
    i: 1
}
// incremental assignments still work
Inner.prototype.j = 2
/** @type {string} */
Inner.prototype.k;
var inner = new Inner()
inner.m()
inner.i
inner.j
inner.k
