//// [tests/cases/conformance/jsx/tsxEmit3.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

module M {
	export class Foo { constructor() { } }
	export module S {
		export class Bar { }

		// Emit Foo
		// Foo, <Foo />;
	}
}

module M {
	// Emit M.Foo
	Foo, <Foo />;

	export module S {
		// Emit M.Foo
		Foo, <Foo />;

		// Emit S.Bar
		Bar, <Bar />;
	}

}

module M {
	// Emit M.S.Bar
	S.Bar, <S.Bar />;
}

module M {
	var M = 100;
	// Emit M_1.Foo
	Foo, <Foo />;
}


//// [file.jsx]
var M;
(function (M) {
    class Foo {
        constructor() { }
    }
    M.Foo = Foo;
    let S;
    (function (S) {
        class Bar {
        }
        S.Bar = Bar;
        // Emit Foo
        // Foo, <Foo />;
    })(S = M.S || (M.S = {}));
})(M || (M = {}));
(function (M) {
    // Emit M.Foo
    Foo, <Foo />;
    let S;
    (function (S) {
        // Emit M.Foo
        Foo, <Foo />;
        // Emit S.Bar
        Bar, <Bar />;
    })(S = M.S || (M.S = {}));
})(M || (M = {}));
(function (M) {
    // Emit M.S.Bar
    S.Bar, <S.Bar />;
})(M || (M = {}));
(function (M_1) {
    var M = 100;
    // Emit M_1.Foo
    Foo, <Foo />;
})(M || (M = {}));
//# sourceMappingURL=file.jsx.map