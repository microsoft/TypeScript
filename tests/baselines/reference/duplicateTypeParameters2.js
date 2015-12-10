//// [duplicateTypeParameters2.ts]
class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}

//// [duplicateTypeParameters2.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    return B;
}());
