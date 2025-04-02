//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithConstraintsTypeArgumentInference2.ts] ////

//// [genericCallWithConstraintsTypeArgumentInference2.ts]
// Generic call with parameters of T and U, U extends T, no parameter of type U

function foo<T, U extends T>(t: T) {
    var u: U;
    return u;
}

var r = foo(1); // ok
var r2 = foo(null); // {}
var r3 = foo(new Object()); // {}
var r4 = foo<Date, Date>(1); // error
var r5 = foo<Date, Date>(new Date()); // no error

//// [genericCallWithConstraintsTypeArgumentInference2.js]
// Generic call with parameters of T and U, U extends T, no parameter of type U
function foo(t) {
    var u;
    return u;
}
var r = foo(1); // ok
var r2 = foo(null); // {}
var r3 = foo(new Object()); // {}
var r4 = foo(1); // error
var r5 = foo(new Date()); // no error
