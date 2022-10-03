// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: def.js
class Outer {}

// @Filename: a.js
Outer.Inner = class I {
    messages() { return [] }
}
/** @type {!Outer.Inner} */
Outer.i

// @Filename: b.js
var msgs = Outer.i.messages()

/** @param {Outer.Inner} inner */
function x(inner) {
}
