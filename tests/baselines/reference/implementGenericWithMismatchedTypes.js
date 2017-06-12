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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
        return null;
    };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.foo = function (x) {
        return null;
    };
    return C2;
}());
