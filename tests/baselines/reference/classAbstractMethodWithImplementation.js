//// [classAbstractMethodWithImplementation.ts]
abstract class A {
    abstract foo() {}
}

//// [classAbstractMethodWithImplementation.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
