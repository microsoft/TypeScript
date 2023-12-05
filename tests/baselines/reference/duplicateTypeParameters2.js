//// [tests/cases/compiler/duplicateTypeParameters2.ts] ////

//// [duplicateTypeParameters2.ts]
class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}

//// [duplicateTypeParameters2.js]
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
