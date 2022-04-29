//// [invalidEnumAssignments.ts]
enum E {
    A,
    B
}

enum E2 {
    A,
    B
}

var e: E;
var e2: E2;

e = E2.A;
e2 = E.A;
e = <void>null;
e = {};
e = '';

function f<T>(a: T) {
    e = a;
}

//// [invalidEnumAssignments.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 0] = "A";
    E2[E2["B"] = 1] = "B";
})(E2 || (E2 = {}));
var e;
var e2;
e = E2.A;
e2 = E.A;
e = null;
e = {};
e = '';
function f(a) {
    e = a;
}
