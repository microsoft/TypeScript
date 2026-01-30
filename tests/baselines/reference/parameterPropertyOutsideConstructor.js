//// [tests/cases/compiler/parameterPropertyOutsideConstructor.ts] ////

//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
    };
    return C;
}());
