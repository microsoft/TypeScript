//// [instantiateGenericClassWithZeroTypeArguments.ts]
// no errors expected when instantiating a generic type with no type arguments provided

class C<T> {
    x: T;
}

var c = new C();

class D<T, U> {
    x: T
    y: U
}

var d = new D();


//// [instantiateGenericClassWithZeroTypeArguments.js]
// no errors expected when instantiating a generic type with no type arguments provided
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
var d = new D();
