// Type inference infers from indexers in target type, no errors expected

function foo<T>(x: T) {
    return x;
}

var a: { [x: string]: Date };
var r = foo(a);

function other<T>(arg: T) {
    var b: { [x: string]: T };
    var r2 = foo(b); // T
}

function other2<T extends Date>(arg: T) {
    var b: { [x: string]: T };
    var r2 = foo(b);
    var d: Date = r2['hm']; // ok
}

function other3<T extends Date, U extends Date>(arg: T) {
    var b: { [x: string]: T };
    var r2 = foo(b);
    var d: Date = r2['hm']; // ok
    // BUG 821629
    //var u: U = r2['hm']; // ok
}

//function other3<T extends U, U extends Date>(arg: T) {
//    var b: { [x: string]: T };
//    var r2 = foo(b);
//    var d: Date = r2['hm']; // ok
//    // BUG 821629
//    //var u: U = r2['hm']; // ok
//}