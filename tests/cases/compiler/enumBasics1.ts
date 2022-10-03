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