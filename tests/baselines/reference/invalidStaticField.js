//// [tests/cases/compiler/invalidStaticField.ts] ////

//// [invalidStaticField.ts]
class A { foo() { return B.NULL; } }
class B { static NOT_NULL = new B(); }

//// [invalidStaticField.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { return B.NULL; };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.NOT_NULL = new B();
    return B;
}());
