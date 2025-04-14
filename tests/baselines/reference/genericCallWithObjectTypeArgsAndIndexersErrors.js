//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectTypeArgsAndIndexersErrors.ts] ////

//// [genericCallWithObjectTypeArgsAndIndexersErrors.ts]
// Type inference infers from indexers in target type, error cases

function foo<T>(x: T) {
    return x;
}

function other<T>(arg: T) {
    var b: {
        [x: string]: Object;
        [x: number]: T; // ok, T is a subtype of Object because its apparent type is {}
    };
    var r2 = foo(b); // T
}

function other3<T extends U, U extends Date>(arg: T) {
    var b: {
        [x: string]: Object;
        [x: number]: T;
    };
    var r2 = foo(b);
    var d = r2[1];
    var e = r2['1'];
    var u: U = r2[1]; // ok
}

//// [genericCallWithObjectTypeArgsAndIndexersErrors.js]
// Type inference infers from indexers in target type, error cases
function foo(x) {
    return x;
}
function other(arg) {
    var b;
    var r2 = foo(b); // T
}
function other3(arg) {
    var b;
    var r2 = foo(b);
    var d = r2[1];
    var e = r2['1'];
    var u = r2[1]; // ok
}
