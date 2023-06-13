//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectTypeArgsAndIndexers.ts] ////

//// [genericCallWithObjectTypeArgsAndIndexers.ts]
// Type inference infers from indexers in target type, no errors expected

function foo<T>(x: T) {
    return x;
}

var a: {
    [x: string]: Object;
    [x: number]: Date;
};
var r = foo(a);

function other<T extends Date>(arg: T) {
    var b: {
        [x: string]: Object;
        [x: number]: T
    };
    var r2 = foo(b);
    var d = r2[1]; 
    var e = r2['1']; 
}

//// [genericCallWithObjectTypeArgsAndIndexers.js]
// Type inference infers from indexers in target type, no errors expected
function foo(x) {
    return x;
}
var a;
var r = foo(a);
function other(arg) {
    var b;
    var r2 = foo(b);
    var d = r2[1];
    var e = r2['1'];
}
