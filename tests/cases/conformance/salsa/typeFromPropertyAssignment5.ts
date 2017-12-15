// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
// @target: es6
export default function MyClass() {
}
MyClass.bar = class C {
}
MyClass.bar

// @Filename: b.js
import MC from './a'
MC.bar
/** @type {MC.bar} */
var x
