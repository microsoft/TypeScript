//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectLiteralArgs.ts] ////

//// [genericCallWithObjectLiteralArgs.ts]
function foo<T>(x: { bar: T; baz: T }) {
    return x;
}

var r = foo({ bar: 1, baz: '' }); // error
var r2 = foo({ bar: 1, baz: 1 }); // T = number
var r3 = foo({ bar: foo, baz: foo }); // T = typeof foo
var r4 = foo<Object>({ bar: 1, baz: '' }); // T = Object

//// [genericCallWithObjectLiteralArgs.js]
function foo(x) {
    return x;
}
var r = foo({ bar: 1, baz: '' }); // error
var r2 = foo({ bar: 1, baz: 1 }); // T = number
var r3 = foo({ bar: foo, baz: foo }); // T = typeof foo
var r4 = foo({ bar: 1, baz: '' }); // T = Object
