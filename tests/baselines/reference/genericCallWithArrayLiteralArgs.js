//// [genericCallWithArrayLiteralArgs.ts]
function foo<T>(t: T) {
    return t;
}

var r = foo([1, 2]); // number[]
var r = foo<number[]>([1, 2]); // number[]
var ra = foo<any[]>([1, 2]); // any[]
var r2 = foo([]); // any[]
var r3 = foo<number[]>([]); // number[]
var r4 = foo([1, '']); // {}[]
var r5 = foo<any[]>([1, '']); // any[]
var r6 = foo<Object[]>([1, '']); // Object[]


//// [genericCallWithArrayLiteralArgs.js]
function foo(t) {
    return t;
}
var r = foo([1, 2]); // number[]
var r = foo([1, 2]); // number[]
var ra = foo([1, 2]); // any[]
var r2 = foo([]); // any[]
var r3 = foo([]); // number[]
var r4 = foo([1, '']); // {}[]
var r5 = foo([1, '']); // any[]
var r6 = foo([1, '']); // Object[]
