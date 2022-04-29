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