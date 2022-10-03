//// [privateVisibles.ts]
class Foo {
	private pvar = 0;
	constructor() {
	    var n = this.pvar;
	}

	public meth() { var q = this.pvar;}
}


//// [privateVisibles.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.pvar = 0;
        var n = this.pvar;
    }
    Foo.prototype.meth = function () { var q = this.pvar; };
    return Foo;
}());
