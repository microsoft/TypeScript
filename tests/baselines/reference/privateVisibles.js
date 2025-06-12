//// [tests/cases/compiler/privateVisibles.ts] ////

//// [privateVisibles.ts]
class Foo {
	private pvar = 0;
	constructor() {
	    var n = this.pvar;
	}

	public meth() { var q = this.pvar;}
}


//// [privateVisibles.js]
class Foo {
    constructor() {
        this.pvar = 0;
        var n = this.pvar;
    }
    meth() { var q = this.pvar; }
}
