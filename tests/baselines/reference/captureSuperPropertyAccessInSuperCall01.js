//// [tests/cases/compiler/captureSuperPropertyAccessInSuperCall01.ts] ////

//// [captureSuperPropertyAccessInSuperCall01.ts]
class A {
	constructor(f: () => string) {
	}
	public blah(): string { return ""; }
}

class B extends A {
	constructor() {
		super(() => { return super.blah(); })
	}
}

//// [captureSuperPropertyAccessInSuperCall01.js]
class A {
    constructor(f) {
    }
    blah() { return ""; }
}
class B extends A {
    constructor() {
        super(() => { return super.blah(); });
    }
}
