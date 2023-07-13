//// [tests/cases/compiler/implementGenericWithMismatchedTypes.ts] ////

//// [implementGenericWithMismatchedTypes.ts]
// no errors because in the derived types the best common type for T's value is Object
// and that matches the original signature for assignability since we treat its T's as Object

interface IFoo<T> {
    foo(x: T): T;
}
class C<T> implements IFoo<T> { // error
    foo(x: string): number {
        return null;
    }
}

interface IFoo2<T> {
    foo(x: T): T;
}
class C2<T> implements IFoo2<T> { // error
    foo<Tstring>(x: Tstring): number {
        return null;
    }
}

//// [implementGenericWithMismatchedTypes.js]
// no errors because in the derived types the best common type for T's value is Object
// and that matches the original signature for assignability since we treat its T's as Object
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) {
        return null;
    };
    return C2;
}());
