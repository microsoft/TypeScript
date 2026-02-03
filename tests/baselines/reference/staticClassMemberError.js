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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.a = function () {
        s = 1;
    };
    return C;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
