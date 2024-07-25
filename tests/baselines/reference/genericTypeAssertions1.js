//// [tests/cases/compiler/genericTypeAssertions1.ts] ////

//// [genericTypeAssertions1.ts]
class A<T> { foo(x: T) { }}
var foo = new A<number>();
var r: A<string> = <A<number>>new A(); // error
var r2: A<number> = <A<A<number>>>foo; // error

//// [genericTypeAssertions1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function (x) { };
    return A;
}());
var foo = new A();
var r = new A(); // error
var r2 = foo; // error
