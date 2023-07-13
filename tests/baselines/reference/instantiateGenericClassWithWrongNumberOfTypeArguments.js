//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/instantiateGenericClassWithWrongNumberOfTypeArguments.ts] ////

//// [instantiateGenericClassWithWrongNumberOfTypeArguments.ts]
// it is always an error to provide a type argument list whose count does not match the type parameter list
// both of these attempts to construct a type is an error

class C<T> {
    x: T;
}

var c = new C<number, number>();

class D<T, U> {
    x: T
    y: U
}

// BUG 794238
var d = new D<number>();

//// [instantiateGenericClassWithWrongNumberOfTypeArguments.js]
// it is always an error to provide a type argument list whose count does not match the type parameter list
// both of these attempts to construct a type is an error
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c = new C();
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
// BUG 794238
var d = new D();
