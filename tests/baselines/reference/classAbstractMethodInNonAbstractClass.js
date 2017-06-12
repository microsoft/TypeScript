//// [classAbstractMethodInNonAbstractClass.ts]
class A {
    abstract foo();
}

class B {
    abstract foo() {}
}

//// [classAbstractMethodInNonAbstractClass.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_1 = B.prototype;
    proto_1.foo = function () { };
    return B;
}());
