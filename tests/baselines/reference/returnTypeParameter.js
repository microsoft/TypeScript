//// [tests/cases/compiler/returnTypeParameter.ts] ////

//// [returnTypeParameter.ts]
function f<T>(a: T): T { } // error, no return statement
function f2<T>(a: T): T { return T; } // bug was that this satisfied the return statement requirement

//// [returnTypeParameter.js]
function f(a) { } // error, no return statement
function f2(a) { return T; } // bug was that this satisfied the return statement requirement
