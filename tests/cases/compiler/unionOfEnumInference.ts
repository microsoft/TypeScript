// @strict: true

// Repro from #42932

enum Enum { A, B, C }

interface Interface<T extends Enum> {
	type: T;
}

function foo<T extends Enum>(x: Interface<T>) { }

function bar(x: Interface<Enum.A | Enum.B> | Interface<Enum.C>) {
	foo(x);
}
