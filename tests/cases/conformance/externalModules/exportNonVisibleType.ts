// @Filename: foo1.ts
interface I1 {
	a: string;
	b: number;
}

var x: I1 = {a: "test", b: 42};
export = x; // Should fail, I1 not exported.


// @Filename: foo2.ts
interface I1 {
	a: string;
	b: number;
}

class C1 {
	m1: I1;
}

export = C1; // Should fail, type I1 of visible member C1.m1 not exported.

// @Filename: foo3.ts
interface I1 {
	a: string;
	b: number;
}

class C1 {
	private m1: I1;
}

export = C1; // Should work, private type I1 of visible class C1 only used in private member m1.
