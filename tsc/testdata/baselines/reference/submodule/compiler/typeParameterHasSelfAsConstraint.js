//// [tests/cases/compiler/typeParameterHasSelfAsConstraint.ts] ////

//// [typeParameterHasSelfAsConstraint.ts]
function foo<T extends T>(x: T): number {
    return x;
}
 


//// [typeParameterHasSelfAsConstraint.js]
"use strict";
function foo(x) {
    return x;
}
