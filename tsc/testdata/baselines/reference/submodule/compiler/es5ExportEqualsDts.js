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
