//// [tests/cases/conformance/salsa/staticPropertyAssignmentInherited3.ts] ////

//// [staticPropertyAssignmentInherited3.js]
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




//// [staticPropertyAssignmentInherited3.d.ts]
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
declare namespace Derived {
    let value1: number;
    let value4: {
        20: string;
    };
    let value5: {};
}
