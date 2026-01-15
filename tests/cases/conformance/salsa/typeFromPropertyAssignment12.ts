// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: module.js
var Outer = function(element, config) {};
// @Filename: usage.js
/** @constructor */
Outer.Pos = function (line, ch) {};
/** @type {number} */
Outer.Pos.prototype.line;
var pos = new Outer.Pos(1, 'x');
pos.line;

