//// [tests/cases/compiler/classWithMultipleBaseClasses.ts] ////

//// [classWithMultipleBaseClasses.ts]
class A {
    foo() { }
}

class B {
    bar() { }
}

interface I {
    baz();
}

interface J {
    bat();
}


class D implements I, J {
    baz() { }
    bat() { }
}

interface I extends A, B {
}

//// [classWithMultipleBaseClasses.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    return B;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.baz = function () { };
    D.prototype.bat = function () { };
    return D;
}());
