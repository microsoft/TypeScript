//// [duplicateTypeParameters2.ts]
class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}

//// [duplicateTypeParameters2.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    proto_2.bar = function () { };
    return B;
}());
