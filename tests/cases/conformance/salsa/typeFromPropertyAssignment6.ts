// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
// @target: es6
var Outer = class { }
Outer.Inner = class {
    messages() { return [] }
}
/** @type {!Outer.Inner} */
Outer.i

// @Filename: b.js
var msgs = Outer.i.messages()
