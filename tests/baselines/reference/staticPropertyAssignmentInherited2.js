//// [tests/cases/conformance/salsa/staticPropertyAssignmentInherited2.ts] ////

//// [staticPropertyAssignmentInherited2.js]
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




//// [staticPropertyAssignmentInherited2.d.ts]
/** @param {typeof Derived} cls  */
declare function test(cls: typeof Derived): void;
declare let v: string | number;
declare class Base {
    static value1: string | number;
    static value2: string | number;
    static value3: string | number;
}
declare class Derived extends Base {
}
