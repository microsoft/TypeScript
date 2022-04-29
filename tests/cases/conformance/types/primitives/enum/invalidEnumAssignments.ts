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