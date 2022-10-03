// @Filename: prototypePropertyAssignmentMergeAcrossFiles2.js
// @allowJs: true
// @checkJs: true
// @noEmit: true
var Ns = {}
Ns.One = function() {};
Ns.Two = function() {};

Ns.One.prototype = {
  ok() {},
};
Ns.Two.prototype = {
}

// @Filename: other.js
/**
 * @type {Ns.One}
 */
var one;
one.wat;
/**
 * @type {Ns.Two}
 */
var two;
two.wat;
