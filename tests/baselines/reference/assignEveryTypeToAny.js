//// [assignEveryTypeToAny.ts]
// all of these are valid

var x: any;

x = 1;
var a = 2;
x = a;

x = true;
var b = true;
x = b;

x = "";
var c = "";
x = c;

var d: void;
x = d;

var e = undefined;
x = e;

var e2: typeof undefined;
x = e2;

enum E {
    A
}

x = E.A;
var f = E.A;
x = f;

interface I {
    foo: string;
}

var g: I;
x = g;

class C {
    bar: string;
}

var h: C;
x = h;

var i: { (): string };
x = i;
x = { f() { return 1; } }
x = { f<T>(x: T) { return x; } }

function j<T>(a: T) {
    x = a;
}

//// [assignEveryTypeToAny.js]
// all of these are valid
var x;
x = 1;
var a = 2;
x = a;
x = true;
var b = true;
x = b;
x = "";
var c = "";
x = c;
var d;
x = d;
var e = undefined;
x = e;
var e2;
x = e2;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
x = E.A;
var f = E.A;
x = f;
var g;
x = g;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var h;
x = h;
var i;
x = i;
x = { f: function () { return 1; } };
x = { f: function (x) { return x; } };
function j(a) {
    x = a;
}
