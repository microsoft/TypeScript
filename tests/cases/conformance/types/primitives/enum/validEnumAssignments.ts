enum E {
    A,
    B
}

var n: number;
var a: any;
var e: E;

n = e;
n = E.A;

a = n;
a = e;
a = E.A;

e = e;
e = E.A;
e = E.B;
e = n;
e = null;
e = undefined;
e = 1;
e = 1.;
e = 1.0;
e = -1;