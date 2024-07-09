//// [tests/cases/conformance/types/primitives/undefined/validUndefinedAssignments.ts] ////

//// [validUndefinedAssignments.ts]
var x: typeof undefined;

var a: number = x;
var b: boolean = x;
var c: string = x;
var d: void = x;

var e: typeof undefined = x;
e = x; // should work

class C { foo: string }
var f: C;
f = x;

interface I { foo: string }
var g: I;
g = x;

var h: { f(): void } = x;

function i<T>(a: T) {
    a = x;
}

//// [validUndefinedAssignments.js]
var x;
var a = x;
var b = x;
var c = x;
var d = x;
var e = x;
e = x; // should work
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var f;
f = x;
var g;
g = x;
var h = x;
function i(a) {
    a = x;
}
