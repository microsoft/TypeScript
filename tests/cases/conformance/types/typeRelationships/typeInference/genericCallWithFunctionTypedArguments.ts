// Generic functions used as arguments for function typed parameters are not used to make inferences from
// Using function arguments, no errors expected

function foo<T>(x: (a: T) => T) {
    return x(null);
}

var r = foo(<U>(x: U) => ''); // {}
var r2 = foo<string>(<U>(x: U) => ''); // string 
var r3 = foo(x => ''); // {}

function foo2<T, U>(x: T, cb: (a: T) => U) {
    return cb(x);
}

var r4 = foo2(1, function <Z>(a: Z) { return '' }); // string, contextual signature instantiation is applied to generic functions
var r5 = foo2(1, (a) => ''); // string
var r6 = foo2<string, number>('', <Z>(a: Z) => 1);

function foo3<T, U>(x: T, cb: (a: T) => U, y: U) {
    return cb(x);
}

var r7 = foo3(1, <Z>(a: Z) => '', ''); // string

var r8 = foo3(1, function (a) { return '' }, 1); // error
var r9 = foo3<number, string>(1, (a) => '', ''); // string

function other<T, U>(t: T, u: U) {
    var r10 = foo2(1, (x: T) => ''); // error
    var r10 = foo2(1, (x) => ''); // string

    var r11 = foo3(1, (x: T) => '', ''); // error
    var r11b = foo3(1, (x: T) => '', 1); // error
    var r12 = foo3(1, function (a) { return '' }, 1); // error
}