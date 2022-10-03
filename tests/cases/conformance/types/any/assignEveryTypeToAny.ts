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