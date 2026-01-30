//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractMethodWithImplementation.ts] ////

//// [classAbstractMethodWithImplementation.ts]
abstract class A {
    abstract foo() {}
}

//// [classAbstractMethodWithImplementation.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
