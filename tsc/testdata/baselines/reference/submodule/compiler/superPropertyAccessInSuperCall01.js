//// [tests/cases/compiler/superPropertyAccessInSuperCall01.ts] ////

//// [superPropertyAccessInSuperCall01.ts]
class A {
	constructor(f: string) {
	}
	public blah(): string { return ""; }
}

class B extends A {
	constructor() {
		super(super.blah())
	}
}

//// [superPropertyAccessInSuperCall01.js]
class A {
    constructor(f) {
    }
    blah() { return ""; }
}
class B extends A {
    constructor() {
        super(super.blah());
    }
}
