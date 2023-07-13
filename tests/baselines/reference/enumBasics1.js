//// [tests/cases/compiler/enumBasics1.ts] ////

//// [enumBasics1.ts]
enum E {
	A = 1,
	B,
	C
}

/*
var a: E;
var b = E["B"]; // shouldn't error


function foo(e: E) {}

foo(a); // shouldn't error


class C {
	public e: E;

	public m(): E { return this.e; } // shouldn't error
}


var e = E; // shouldn't error
*/
E.A.A; // should error


enum E2 {
	A,
	B,
}

enum E2 { // should error for continued autonumbering
	C,
	D,
}

//// [enumBasics1.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));
/*
var a: E;
var b = E["B"]; // shouldn't error


function foo(e: E) {}

foo(a); // shouldn't error


class C {
    public e: E;

    public m(): E { return this.e; } // shouldn't error
}


var e = E; // shouldn't error
*/
E.A.A; // should error
var E2;
(function (E2) {
    E2[E2["A"] = 0] = "A";
    E2[E2["B"] = 1] = "B";
})(E2 || (E2 = {}));
(function (E2) {
    E2[E2["C"] = 0] = "C";
    E2[E2["D"] = 1] = "D";
})(E2 || (E2 = {}));
