//// [tests/cases/conformance/salsa/staticPropertyAssignmentInherited1.ts] ////

//// [staticPropertyAssignmentInherited1.js]
let v = Math.random() ? '' : Math.random() ? 0 : undefined;

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




//// [staticPropertyAssignmentInherited1.d.ts]
/** @param {typeof Derived} cls  */
declare function test(cls: typeof Derived): void;
declare let v: string | number | undefined;
declare class Base {
    static value1: string | number | undefined;
    static value2: string | number | undefined;
    static value3: string | number | undefined;
}
declare class Derived extends Base {
}
