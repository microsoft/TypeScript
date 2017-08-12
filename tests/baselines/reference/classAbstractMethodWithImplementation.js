//// [classAbstractMethodWithImplementation.ts]
abstract class A {
    abstract foo() {}
}

//// [classAbstractMethodWithImplementation.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
