//// [tests/cases/compiler/instantiateTypeParameter.ts] ////

//// [instantiateTypeParameter.ts]
interface Foo<T> {
    var x: T<>;
}

//// [instantiateTypeParameter.js]
var x;
