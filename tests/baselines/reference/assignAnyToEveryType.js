//// [tests/cases/conformance/types/any/assignAnyToEveryType.ts] ////

//// [assignAnyToEveryType.ts]
// all of these are valid

var x: any;

var a: number = x;
var b: boolean = x;
var c: string = x;
var d: void = x;
var e = null;
e = x;
var f = undefined;
f = x;

enum E {
    A
}

var g: E = x;
var g2 = E.A;
g2 = x;

class C {
    foo: string;
}

var h: C = x;

interface I {
    foo: string;
}

var i: I = x;

var j: { (): string } = x;
var j2: { <T>(x: T): string } = x;

module M {
    export var foo = 1;
}

M = x;

function k<T>(a: T) {
    a = x;
}

//// [assignAnyToEveryType.js]
// all of these are valid
var x;
var a = x;
var b = x;
var c = x;
var d = x;
var e = null;
e = x;
var f = undefined;
f = x;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var g = x;
var g2 = E.A;
g2 = x;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var h = x;
var i = x;
var j = x;
var j2 = x;
var M;
(function (M) {
    M.foo = 1;
})(M || (M = {}));
M = x;
function k(a) {
    a = x;
}
