//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/instantiateGenericClassWithZeroTypeArguments.ts] ////

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
class C {
}
var c = new C();
class D {
}
var d = new D();
