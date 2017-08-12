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
var D = (function () {
    function D() {
    }
    var proto_3 = D.prototype;
    proto_3.baz = function () { };
    proto_3.bat = function () { };
    return D;
}());
