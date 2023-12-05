//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectTypeArgsAndNumericIndexer.ts] ////

//// [genericCallWithObjectTypeArgsAndNumericIndexer.ts]
// Type inference infers from indexers in target type, no errors expected

function foo<T>(x: T) {
    return x;
}

var a: { [x: number]: Date };
var r = foo(a);

function other<T>(arg: T) {
    var b: { [x: number]: T };
    var r2 = foo(b); // T
}

function other2<T extends Date>(arg: T) {
    var b: { [x: number]: T };
    var r2 = foo(b);
    var d = r2[1];
}

function other3<T extends Date, U extends Date>(arg: T) {
    var b: { [x: number]: T };
    var r2 = foo(b);
    var d = r2[1];
    // BUG 821629
    //var u: U = r2[1]; // ok
}
//function other3<T extends U, U extends Date>(arg: T) {
//    var b: { [x: number]: T };
//    var r2 = foo(b);
//    var d = r2[1];
//    // BUG 821629
//    //var u: U = r2[1]; // ok
//}

//// [genericCallWithObjectTypeArgsAndNumericIndexer.js]
// Type inference infers from indexers in target type, no errors expected
function foo(x) {
    return x;
}
var a;
var r = foo(a);
function other(arg) {
    var b;
    var r2 = foo(b); // T
}
function other2(arg) {
    var b;
    var r2 = foo(b);
    var d = r2[1];
}
function other3(arg) {
    var b;
    var r2 = foo(b);
    var d = r2[1];
    // BUG 821629
    //var u: U = r2[1]; // ok
}
//function other3<T extends U, U extends Date>(arg: T) {
//    var b: { [x: number]: T };
//    var r2 = foo(b);
//    var d = r2[1];
//    // BUG 821629
//    //var u: U = r2[1]; // ok
//}
