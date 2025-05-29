//// [tests/cases/compiler/es5ExportEqualsDts.ts] ////

//// [es5ExportEqualsDts.ts]
class A {
    foo() {
        var aVal: A.B;
        return aVal;
    }
}

module A {
    export interface B { }
}

export = A

//// [es5ExportEqualsDts.js]
"use strict";
class A {
    foo() {
        var aVal;
        return aVal;
    }
}
module.exports = A;


//// [es5ExportEqualsDts.d.ts]
declare class A {
    foo(): import("./es5ExportEqualsDts").B;
}
declare namespace A {
    interface B {
    }
}
export = A;
