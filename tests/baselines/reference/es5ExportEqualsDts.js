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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () {
        var aVal;
        return aVal;
    };
    return A;
}());
module.exports = A;


//// [es5ExportEqualsDts.d.ts]
declare class A {
    foo(): A.B;
}
declare namespace A {
    interface B {
    }
}
export = A;
