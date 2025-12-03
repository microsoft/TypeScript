// @allowUnreachableCode: true
// @module: commonjs

export namespace Foo {
	export class C {}
}

export namespace Foo {

	function Bar() : C {
		if (true) { return Bar();}
		return new C();
	}

	function Baz() : C {
		var c = Baz();
		return Bar();
	}

	function Gar() {
		var c : C = Baz();
		return;
	}
	
}
