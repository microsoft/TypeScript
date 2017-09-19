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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () {
        var x;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    };
    return A;
}());
