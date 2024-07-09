// @allowUnreachableCode: true
// @module: commonjs

export module Foo {
	export class C {}
}

export module Foo {

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
