//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithFunctionTypedArguments3.ts] ////

//// [genericCallWithFunctionTypedArguments3.ts]
// No inference is made from function typed arguments which have multiple call signatures

var a: {
    (x: boolean): boolean;
    (x: string): any;
}

function foo4<T, U>(cb: (x: T) => U) {
    var u: U;
    return u;
}

var r = foo4(a); // T is {} (candidates boolean and string), U is any (candidates any and boolean)

var b: {
    <T>(x: boolean): T;
    <T>(x: T): any;
}

var r2 = foo4(b); // T is {} (candidates boolean and {}), U is any (candidates any and {})

//// [genericCallWithFunctionTypedArguments3.js]
// No inference is made from function typed arguments which have multiple call signatures
var a;
function foo4(cb) {
    var u;
    return u;
}
var r = foo4(a); // T is {} (candidates boolean and string), U is any (candidates any and boolean)
var b;
var r2 = foo4(b); // T is {} (candidates boolean and {}), U is any (candidates any and {})
