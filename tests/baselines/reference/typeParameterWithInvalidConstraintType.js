//// [typeParameterWithInvalidConstraintType.ts]
class A<T extends T> {
    foo() {
        var x: T;
        // no error expected below this line
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
    A.prototype.foo = function () {
        var x;
        // no error expected below this line
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    };
    return A;
}());
