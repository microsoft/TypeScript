//// [tests/cases/compiler/staticClassMemberError.ts] ////

//// [staticClassMemberError.ts]
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

//// [staticClassMemberError.js]
class C {
    static s;
    a() {
        s = 1;
    }
}
class Foo {
    static bar;
}
