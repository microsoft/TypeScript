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
function func1() {
    aFunc();
    console.log(EnumA.Value);
    console.log(EnumB.Value);
    return;
    function aFunc() {
        console.log(EnumA.Value);
        console.log(EnumB.Value);
    }
    let EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
    let EnumB;
    (function (EnumB) {
        EnumB[EnumB["Value"] = 0] = "Value";
    })(EnumB || (EnumB = {}));
}
function func2() {
    aFunc();
    console.log(EnumA.Value);
    return;
    function aFunc() {
        console.log(EnumA.Value);
    }
    let EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
}
function func3() {
    aFunc();
    console.log(EnumB.Value);
    return;
    function aFunc() {
        console.log(EnumB.Value);
    }
    let EnumB;
    (function (EnumB) {
        EnumB[EnumB["Value"] = 0] = "Value";
    })(EnumB || (EnumB = {}));
}
function func4() {
    aFunc();
    console.log(ClassA.Value);
    return;
    function aFunc() {
        console.log(ClassA.Value);
    }
    class ClassA {
        static Value = 1234;
    }
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
    const blah = { prop: 1234 };
    let Bar;
    (function (Bar) {
        Bar[Bar["A"] = 0] = "A";
    })(Bar || (Bar = {}));
    class Foo {
        x = 1234;
    }
    let Baz;
    (function (Baz) {
        Baz.value = 1234;
    })(Baz || (Baz = {}));
}
