//// [invalidStaticField.ts]
class A { foo() { return B.NULL; } }
class B { static NOT_NULL = new B(); }

//// [invalidStaticField.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { return B.NULL; };
    return A;
}());
var B = (function () {
    function B() {
    }
    B.NOT_NULL = new B();
    return B;
}());
