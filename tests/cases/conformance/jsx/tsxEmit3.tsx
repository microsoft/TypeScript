//@filename: file.tsx
//@jsx: preserve
//@sourceMap: true

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
