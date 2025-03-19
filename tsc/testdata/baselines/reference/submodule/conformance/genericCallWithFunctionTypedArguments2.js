//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithFunctionTypedArguments2.ts] ////

//// [genericCallWithFunctionTypedArguments2.ts]
// Generic functions used as arguments for function typed parameters are not used to make inferences from
// Using construct signature arguments, no errors expected

function foo<T>(x: new(a: T) => T) {
    return new x(null);
}

interface I {
    new <T>(x: T): T;
}
interface I2<T> {
    new (x: T): T;
}
var i: I;
var i2: I2<string>;
var a: {
    new <T>(x: T): T;
}

var r = foo(i); // any
var r2 = foo<string>(i); // string 
var r3 = foo(i2); // string
var r3b = foo(a); // any

function foo2<T, U>(x: T, cb: new(a: T) => U) {
    return new cb(x);
}

var r4 = foo2(1, i2); // error
var r4b = foo2(1, a); // any
var r5 = foo2(1, i); // any
var r6 = foo2<string, string>('', i2); // string

function foo3<T, U>(x: T, cb: new(a: T) => U, y: U) {
    return new cb(x);
}

var r7 = foo3(null, i, ''); // any
var r7b = foo3(null, a, ''); // any
var r8 = foo3(1, i2, 1); // error
var r9 = foo3<string, string>('', i2, ''); // string

//// [genericCallWithFunctionTypedArguments2.js]
// Generic functions used as arguments for function typed parameters are not used to make inferences from
// Using construct signature arguments, no errors expected
function foo(x) {
    return new x(null);
}
var i;
var i2;
var a;
var r = foo(i); // any
var r2 = foo(i); // string 
var r3 = foo(i2); // string
var r3b = foo(a); // any
function foo2(x, cb) {
    return new cb(x);
}
var r4 = foo2(1, i2); // error
var r4b = foo2(1, a); // any
var r5 = foo2(1, i); // any
var r6 = foo2('', i2); // string
function foo3(x, cb, y) {
    return new cb(x);
}
var r7 = foo3(null, i, ''); // any
var r7b = foo3(null, a, ''); // any
var r8 = foo3(1, i2, 1); // error
var r9 = foo3('', i2, ''); // string
