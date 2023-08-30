//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithFunctionTypedArguments4.ts] ////

//// [genericCallWithFunctionTypedArguments4.ts]
// No inference is made from function typed arguments which have multiple call signatures

class C { foo: string }
class D { bar: string }
var a: {
    new(x: boolean): C;
    new(x: string): D;
}

function foo4<T, U>(cb: new(x: T) => U) {
    var u: U;
    return u;
}

var r = foo4(a); // T is {} (candidates boolean and string), U is {} (candidates C and D)

var b: {
    new<T>(x: boolean): T;
    new<T>(x: T): any;
}

var r2 = foo4(b); // T is {} (candidates boolean and {}), U is any (candidates any and {})

//// [genericCallWithFunctionTypedArguments4.js]
// No inference is made from function typed arguments which have multiple call signatures
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var a;
function foo4(cb) {
    var u;
    return u;
}
var r = foo4(a); // T is {} (candidates boolean and string), U is {} (candidates C and D)
var b;
var r2 = foo4(b); // T is {} (candidates boolean and {}), U is any (candidates any and {})
