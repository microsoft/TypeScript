//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractMethodInNonAbstractClass.ts] ////

//// [classAbstractMethodInNonAbstractClass.ts]
class A {
    abstract foo();
}

class B {
    abstract foo() {}
}

//// [classAbstractMethodInNonAbstractClass.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function () { };
    return B;
}());
