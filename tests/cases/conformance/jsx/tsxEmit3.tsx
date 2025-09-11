//@filename: file.tsx
//@jsx: preserve
//@sourceMap: true

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
