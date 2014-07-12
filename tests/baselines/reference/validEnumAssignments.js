//// [validEnumAssignments.ts]
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

//// [validEnumAssignments.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));

var n;
var a;
var e;

n = e;
n = 0 /* A */;

a = n;
a = e;
a = 0 /* A */;

e = e;
e = 0 /* A */;
e = 1 /* B */;
e = n;
e = null;
e = undefined;
e = 1;
e = 1.;
e = 1.0;
e = -1;
