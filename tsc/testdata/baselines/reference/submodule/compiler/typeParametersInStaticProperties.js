//// [tests/cases/compiler/typeParametersInStaticProperties.ts] ////

//// [typeParametersInStaticProperties.ts]
class foo<T> {
    static P: T;
} 

//// [typeParametersInStaticProperties.js]
"use strict";
class foo {
    static P;
}
