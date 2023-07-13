//// [tests/cases/compiler/ambiguousGenericAssertion1.ts] ////

//// [ambiguousGenericAssertion1.ts]
function f<T>(x: T): T { return null; }
var r = <T>(x: T) => x;
var r2 = < <T>(x: T) => T>f; // valid
var r3 = <<T>(x: T) => T>f; // ambiguous, appears to the parser as a << operation


//// [ambiguousGenericAssertion1.js]
function f(x) { return null; }
var r = function (x) { return x; };
var r2 = f; // valid
var r3 =  << T > (x), T;
T > f; // ambiguous, appears to the parser as a << operation
