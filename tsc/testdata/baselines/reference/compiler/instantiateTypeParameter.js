//// [tests/cases/compiler/instantiateTypeParameter.ts] ////

//// [instantiateTypeParameter.ts]
interface Foo<T> {
    var x: T<>;
}

//// [instantiateTypeParameter.js]
"use strict";
var x;
