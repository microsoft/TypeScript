// @checkJs: true
// @strict: true
// @emitDeclarationOnly: true
// @declaration: true

// @filename: staticPropertyAssignmentInherited3.js

let v = Math.random() ? '' : 0;

class Base {
  static value1 = v;
  static value2 = v;
  static value3 = v;
}

class Derived extends Base {}

Derived.value1 = 10;
Derived.value4 = {
  [Derived.value2 = 20]: ''
}
Derived.value5 = {
  get [Derived.value3 = 30]() { return ''; }
}

/** @param {typeof Derived} cls  */
function test(cls) {
  cls.value1;
  cls.value2;
  cls.value3;
}
