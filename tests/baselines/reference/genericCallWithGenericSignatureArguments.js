//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithGenericSignatureArguments.ts] ////

//// [genericCallWithGenericSignatureArguments.ts]
// When a function expression is inferentially typed (section 4.9.3) and a type assigned to a parameter in that expression references type parameters for which inferences are being made, 
// the corresponding inferred type arguments to become fixed and no further candidate inferences are made for them.

function foo<T>(a: (x: T) => T, b: (x: T) => T) {
    var r: (x: T) => T;
    return r;
}

//var r1 = foo((x: number) => 1, (x: string) => ''); // error
var r1b = foo((x) => 1, (x) => ''); // {} => {}
var r2 = foo((x: Object) => null, (x: string) => ''); // Object => Object
var r3 = foo((x: number) => 1, (x: Object) => null); // number => number
var r3ii = foo((x: number) => 1, (x: number) => 1); // number => number

var a: { x: number; y?: number; };
var b: { x: number; z?: number; };

var r4 = foo((x: typeof a) => a, (x: typeof b) => b); // typeof a => typeof a
var r5 = foo((x: typeof b) => b, (x: typeof a) => a); // typeof b => typeof b

function other<T>(x: T) {
    var r6 = foo((a: T) => a, (b: T) => b); // T => T
    var r6b = foo((a) => a, (b) => b); // {} => {}
}

function other2<T extends Date>(x: T) {
    var r7 = foo((a: T) => a, (b: T) => b); // T => T
    var r7b = foo((a) => a, (b) => b); // {} => {}
    var r8 = r7(null);
    // BUG 835518
    //var r9 = r7(new Date());
}


function foo2<T extends Date>(a: (x: T) => T, b: (x: T) => T) {
    var r: (x: T) => T;
    return r;
}

function other3<T extends RegExp>(x: T) {
    var r8 = foo2((a: Date) => a, (b: Date) => b); // Date => Date
}

//// [genericCallWithGenericSignatureArguments.js]
// When a function expression is inferentially typed (section 4.9.3) and a type assigned to a parameter in that expression references type parameters for which inferences are being made, 
// the corresponding inferred type arguments to become fixed and no further candidate inferences are made for them.
function foo(a, b) {
    var r;
    return r;
}
//var r1 = foo((x: number) => 1, (x: string) => ''); // error
var r1b = foo(function (x) { return 1; }, function (x) { return ''; }); // {} => {}
var r2 = foo(function (x) { return null; }, function (x) { return ''; }); // Object => Object
var r3 = foo(function (x) { return 1; }, function (x) { return null; }); // number => number
var r3ii = foo(function (x) { return 1; }, function (x) { return 1; }); // number => number
var a;
var b;
var r4 = foo(function (x) { return a; }, function (x) { return b; }); // typeof a => typeof a
var r5 = foo(function (x) { return b; }, function (x) { return a; }); // typeof b => typeof b
function other(x) {
    var r6 = foo(function (a) { return a; }, function (b) { return b; }); // T => T
    var r6b = foo(function (a) { return a; }, function (b) { return b; }); // {} => {}
}
function other2(x) {
    var r7 = foo(function (a) { return a; }, function (b) { return b; }); // T => T
    var r7b = foo(function (a) { return a; }, function (b) { return b; }); // {} => {}
    var r8 = r7(null);
    // BUG 835518
    //var r9 = r7(new Date());
}
function foo2(a, b) {
    var r;
    return r;
}
function other3(x) {
    var r8 = foo2(function (a) { return a; }, function (b) { return b; }); // Date => Date
}
