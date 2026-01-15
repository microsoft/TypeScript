// @noEmit: true
// @checkJs: true
// @allowJs: true
// @Filename: usage.js
// note that usage is first in the compilation
Outer.Inner.Message = function() {
};

var y = new Outer.Inner()
y.name
/** @type {Outer.Inner} should be instance type, not static type */
var x;
x.name

// @Filename: def.js
var Outer = {}
Outer.Inner = class {
  name() {
    return 'hi'
  }
}
