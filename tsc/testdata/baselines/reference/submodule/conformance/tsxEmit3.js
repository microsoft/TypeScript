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
"use strict";
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