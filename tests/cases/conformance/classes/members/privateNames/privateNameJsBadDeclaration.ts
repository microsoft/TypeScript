// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: privateNameJsPrototype.js

function A() { }
A.prototype = {
  #x: 1         // Error
}
class B { }
B.prototype = {
  #y: 2         // Error
}
class C {
  constructor() {
    this.#z = 3;
  }
}