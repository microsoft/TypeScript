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