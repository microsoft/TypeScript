//// [tests/cases/conformance/jsx/tsxEmit3.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { }
}

namespace M {
	export class Foo { constructor() { } }
	export namespace S {
		export class Bar { }

		// Emit Foo
		// Foo, <Foo />;
	}
}

namespace M {
	// Emit M.Foo
	Foo, <Foo />;

	export namespace S {
		// Emit M.Foo
		Foo, <Foo />;

		// Emit S.Bar
		Bar, <Bar />;
	}

}

namespace M {
	// Emit M.S.Bar
	S.Bar, <S.Bar />;
}

namespace M {
	var M = 100;
	// Emit M_1.Foo
	Foo, <Foo />;
}


//// [file.jsx]
var M;
(function (M) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    M.Foo = Foo;
    var S;
    (function (S) {
        var Bar = /** @class */ (function () {
            function Bar() {
            }
            return Bar;
        }());
        S.Bar = Bar;
        // Emit Foo
        // Foo, <Foo />;
    })(S = M.S || (M.S = {}));
})(M || (M = {}));
(function (M) {
    // Emit M.Foo
    M.Foo, <M.Foo />;
    var S;
    (function (S) {
        // Emit M.Foo
        M.Foo, <M.Foo />;
        // Emit S.Bar
        S.Bar, <S.Bar />;
    })(S = M.S || (M.S = {}));
})(M || (M = {}));
(function (M) {
    // Emit M.S.Bar
    M.S.Bar, <M.S.Bar />;
})(M || (M = {}));
(function (M_1) {
    var M = 100;
    // Emit M_1.Foo
    M_1.Foo, <M_1.Foo />;
})(M || (M = {}));
//# sourceMappingURL=file.jsx.map