//// [genericCallWithNonSymmetricSubtypes.ts]
// generic type argument inference where inference leads to two candidates that are both supertypes of all candidates
// we choose the first candidate so the result is dependent on the order of the arguments provided

function foo<T>(x: T, y: T) {
    var r: T;
    return r;
}

var a: { x: number; y?: number; };
var b: { x: number; z?: number; };

var r = foo(a, b); // { x: number; y?: number; };
var r2 = foo(b, a); // { x: number; z?: number; };

var x: { x: number; };
var y: { x?: number; };

var r3 = foo(a, x); // { x: number; y?: number; };
var r4 = foo(x, a); // { x: number; };

var r5 = foo(a, y); // { x?: number; };
var r5 = foo(y, a); // { x?: number; };

var r6 = foo(x, y); // { x?: number; };
var r6 = foo(y, x); // { x?: number; };

var s1: (x: Object) => string;
var s2: (x: string) => string;

var r7 = foo(s1, s2); // (x: Object) => string;
var r8 = foo(s2, s1); // (x: string) => string;

//// [genericCallWithNonSymmetricSubtypes.js]
// generic type argument inference where inference leads to two candidates that are both supertypes of all candidates
// we choose the first candidate so the result is dependent on the order of the arguments provided
function foo(x, y) {
    var r;
    return r;
}
var a;
var b;
var r = foo(a, b); // { x: number; y?: number; };
var r2 = foo(b, a); // { x: number; z?: number; };
var x;
var y;
var r3 = foo(a, x); // { x: number; y?: number; };
var r4 = foo(x, a); // { x: number; };
var r5 = foo(a, y); // { x?: number; };
var r5 = foo(y, a); // { x?: number; };
var r6 = foo(x, y); // { x?: number; };
var r6 = foo(y, x); // { x?: number; };
var s1;
var s2;
var r7 = foo(s1, s2); // (x: Object) => string;
var r8 = foo(s2, s1); // (x: string) => string;
