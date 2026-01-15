class C {
	static s;
	public a() {
		s = 1;
	}
}

// just want to make sure this one doesn't crash the compiler
function Foo();
class Foo {
 static bar;
}