// @checkJs: true
// @strict: true
// @emitDeclarationOnly: true
// @declaration: true

// @filename: staticPropertyAssignmentInherited2.js

let v = Math.random() ? '' : 0;

class Base {
  static value1 = v;
  static value2 = v;
  static value3 = v;
}

class Derived extends Base {
  static {
    this.value1 = 10;
    this.value4 = {
      [this.value2 = 20]: ''
    }
    this.value5 = {
      get [this.value3 = 30]() { return ''; }
    }
  }
}

/** @param {typeof Derived} cls  */
function test(cls) {
  cls.value1;
  cls.value2;
  cls.value3;
}
