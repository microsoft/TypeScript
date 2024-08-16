//// [tests/cases/compiler/unreachableDeclarations.ts] ////

//// [unreachableDeclarations.ts]
function func1() {
    aFunc();

    console.log(EnumA.Value);
    console.log(EnumB.Value);

    return;

    function aFunc() {
        console.log(EnumA.Value);
        console.log(EnumB.Value);
    }

    enum EnumA { Value }
    const enum EnumB { Value }
}

function func2() {
    aFunc();

    console.log(EnumA.Value);

    return;

    function aFunc() {
        console.log(EnumA.Value);
    }

    enum EnumA { Value }
}

function func3() {
    aFunc();

    console.log(EnumB.Value);

    return;

    function aFunc() {
        console.log(EnumB.Value);
    }

    const enum EnumB { Value }
}

function func4() {
    aFunc();

    console.log(ClassA.Value);

    return;

    function aFunc() {
        console.log(ClassA.Value);
    }

    class ClassA { static Value = 1234; }
}

function func5() {
	aFunc();

	console.log(Bar.A);
	console.log(blah.prop);
	console.log(new Foo())
	console.log(Baz.value);


	return;

	function aFunc() {
		console.log(Bar.A);
		console.log(blah.prop);
		console.log(new Foo())
		console.log(Baz.value);
	}

	const blah = { prop: 1234 };

	enum Bar { A }

	class Foo { x = 1234 }

	namespace Baz { export const value = 1234 }
}


//// [unreachableDeclarations.js]
"use strict";
function func1() {
    aFunc();
    console.log(EnumA.Value);
    console.log(0 /* EnumB.Value */);
    return;
    function aFunc() {
        console.log(EnumA.Value);
        console.log(0 /* EnumB.Value */);
    }
    var EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
}
function func2() {
    aFunc();
    console.log(EnumA.Value);
    return;
    function aFunc() {
        console.log(EnumA.Value);
    }
    var EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
}
function func3() {
    aFunc();
    console.log(0 /* EnumB.Value */);
    return;
    function aFunc() {
        console.log(0 /* EnumB.Value */);
    }
}
function func4() {
    aFunc();
    console.log(ClassA.Value);
    return;
    function aFunc() {
        console.log(ClassA.Value);
    }
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        ClassA.Value = 1234;
        return ClassA;
    }());
}
function func5() {
    aFunc();
    console.log(Bar.A);
    console.log(blah.prop);
    console.log(new Foo());
    console.log(Baz.value);
    return;
    function aFunc() {
        console.log(Bar.A);
        console.log(blah.prop);
        console.log(new Foo());
        console.log(Baz.value);
    }
    var blah = { prop: 1234 };
    var Bar;
    (function (Bar) {
        Bar[Bar["A"] = 0] = "A";
    })(Bar || (Bar = {}));
    var Foo = /** @class */ (function () {
        function Foo() {
            this.x = 1234;
        }
        return Foo;
    }());
    var Baz;
    (function (Baz) {
        Baz.value = 1234;
    })(Baz || (Baz = {}));
}
