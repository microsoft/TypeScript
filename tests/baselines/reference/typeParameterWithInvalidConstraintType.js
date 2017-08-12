//// [typeParameterWithInvalidConstraintType.ts]
class A<T extends T> {
    foo() {
        var x: T;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}

//// [typeParameterWithInvalidConstraintType.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () {
        var x;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    };
    return A;
}());
