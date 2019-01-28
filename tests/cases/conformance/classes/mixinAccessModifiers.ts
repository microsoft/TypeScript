// @declaration: true

type Constructable = new (...args: any[]) => object;

class Private {
	constructor (...args: any[]) {}
	private p: string;
}

class Private2 {
	constructor (...args: any[]) {}
	private p: string;
}

class Protected {
	constructor (...args: any[]) {}
	protected p: string;
	protected static s: string;
}

class Protected2 {
	constructor (...args: any[]) {}
	protected p: string;
	protected static s: string;
}

class Public {
	constructor (...args: any[]) {}
	public p: string;
	public static s: string;
}

class Public2 {
	constructor (...args: any[]) {}
	public p: string;
	public static s: string;
}

function f1(x: Private & Private2) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f2(x: Private & Protected) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f3(x: Private & Public) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f4(x: Protected & Protected2) {
	x.p;  // Error, protected when all constituents are protected
}

function f5(x: Protected & Public) {
	x.p;  // Ok, public if any constituent is public
}

function f6(x: Public & Public2) {
	x.p;  // Ok, public if any constituent is public
}

declare function Mix<T, U>(c1: T, c2: U): T & U;

// Can't derive from type with inaccessible properties

class C1 extends Mix(Private, Private2) {}
class C2 extends Mix(Private, Protected) {}
class C3 extends Mix(Private, Public) {}

class C4 extends Mix(Protected, Protected2) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;
		C5.s;
		C6.s
	}
}

class C5 extends Mix(Protected, Public) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;  // Error, not in class deriving from Protected2
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;  // Error, not in class deriving from Protected2
		C5.s;
		C6.s
	}
}

class C6 extends Mix(Public, Public2) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;  // Error, not in class deriving from Protected2
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;  // Error, not in class deriving from Protected2
		C5.s;
		C6.s
	}
}

class ProtectedGeneric<T> {
	private privateMethod() {}
	protected protectedMethod() {}
}

class ProtectedGeneric2<T> {
	private privateMethod() {}
	protected protectedMethod() {}
}

function f7(x: ProtectedGeneric<{}> & ProtectedGeneric<{}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}

function f8(x: ProtectedGeneric<{a: void;}> & ProtectedGeneric2<{a:void;b:void;}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}

function f9(x: ProtectedGeneric<{a: void;}> & ProtectedGeneric<{a:void;b:void;}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}
