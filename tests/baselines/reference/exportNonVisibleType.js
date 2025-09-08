//// [tests/cases/conformance/externalModules/exportNonVisibleType.ts] ////

//// [foo1.ts]
interface I1 {
	a: string;
	b: number;
}

var x: I1 = {a: "test", b: 42};
export = x; // Should fail, I1 not exported.


//// [foo2.ts]
interface I1 {
	a: string;
	b: number;
}

class C1 {
	m1: I1;
}

export = C1; // Should fail, type I1 of visible member C1.m1 not exported.

//// [foo3.ts]
interface I1 {
	a: string;
	b: number;
}

class C1 {
	private m1: I1;
}

export = C1; // Should work, private type I1 of visible class C1 only used in private member m1.


//// [foo1.js]
var x = { a: "test", b: 42 };
export {};
//// [foo2.js]
class C1 {
    m1;
}
export {};
//// [foo3.js]
class C1 {
    m1;
}
export {};
