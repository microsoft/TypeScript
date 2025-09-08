//// [tests/cases/conformance/classes/mixinAccessModifiers.ts] ////

//// [mixinAccessModifiers.ts]
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


//// [mixinAccessModifiers.js]
class Private {
    constructor(...args) { }
    p;
}
class Private2 {
    constructor(...args) { }
    p;
}
class Protected {
    constructor(...args) { }
    p;
    static s;
}
class Protected2 {
    constructor(...args) { }
    p;
    static s;
}
class Public {
    constructor(...args) { }
    p;
    static s;
}
class Public2 {
    constructor(...args) { }
    p;
    static s;
}
function f1(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f2(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f3(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f4(x) {
    x.p; // Error, protected when all constituents are protected
}
function f5(x) {
    x.p; // Ok, public if any constituent is public
}
function f6(x) {
    x.p; // Ok, public if any constituent is public
}
// Can't derive from type with inaccessible properties
class C1 extends Mix(Private, Private2) {
}
class C2 extends Mix(Private, Protected) {
}
class C3 extends Mix(Private, Public) {
}
class C4 extends Mix(Protected, Protected2) {
    f(c4, c5, c6) {
        c4.p;
        c5.p;
        c6.p;
    }
    static g() {
        C4.s;
        C5.s;
        C6.s;
    }
}
class C5 extends Mix(Protected, Public) {
    f(c4, c5, c6) {
        c4.p; // Error, not in class deriving from Protected2
        c5.p;
        c6.p;
    }
    static g() {
        C4.s; // Error, not in class deriving from Protected2
        C5.s;
        C6.s;
    }
}
class C6 extends Mix(Public, Public2) {
    f(c4, c5, c6) {
        c4.p; // Error, not in class deriving from Protected2
        c5.p;
        c6.p;
    }
    static g() {
        C4.s; // Error, not in class deriving from Protected2
        C5.s;
        C6.s;
    }
}
class ProtectedGeneric {
    privateMethod() { }
    protectedMethod() { }
}
class ProtectedGeneric2 {
    privateMethod() { }
    protectedMethod() { }
}
function f7(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}
function f8(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}
function f9(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}


//// [mixinAccessModifiers.d.ts]
type Constructable = new (...args: any[]) => object;
declare class Private {
    constructor(...args: any[]);
    private p;
}
declare class Private2 {
    constructor(...args: any[]);
    private p;
}
declare class Protected {
    constructor(...args: any[]);
    protected p: string;
    protected static s: string;
}
declare class Protected2 {
    constructor(...args: any[]);
    protected p: string;
    protected static s: string;
}
declare class Public {
    constructor(...args: any[]);
    p: string;
    static s: string;
}
declare class Public2 {
    constructor(...args: any[]);
    p: string;
    static s: string;
}
declare function f1(x: Private & Private2): void;
declare function f2(x: Private & Protected): void;
declare function f3(x: Private & Public): void;
declare function f4(x: Protected & Protected2): void;
declare function f5(x: Protected & Public): void;
declare function f6(x: Public & Public2): void;
declare function Mix<T, U>(c1: T, c2: U): T & U;
declare const C1_base: typeof Private & typeof Private2;
declare class C1 extends C1_base {
}
declare const C2_base: typeof Private & typeof Protected;
declare class C2 extends C2_base {
}
declare const C3_base: typeof Private & typeof Public;
declare class C3 extends C3_base {
}
declare const C4_base: typeof Protected & typeof Protected2;
declare class C4 extends C4_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare const C5_base: typeof Protected & typeof Public;
declare class C5 extends C5_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare const C6_base: typeof Public & typeof Public2;
declare class C6 extends C6_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare class ProtectedGeneric<T> {
    private privateMethod;
    protected protectedMethod(): void;
}
declare class ProtectedGeneric2<T> {
    private privateMethod;
    protected protectedMethod(): void;
}
declare function f7(x: ProtectedGeneric<{}> & ProtectedGeneric<{}>): void;
declare function f8(x: ProtectedGeneric<{
    a: void;
}> & ProtectedGeneric2<{
    a: void;
    b: void;
}>): void;
declare function f9(x: ProtectedGeneric<{
    a: void;
}> & ProtectedGeneric<{
    a: void;
    b: void;
}>): void;
