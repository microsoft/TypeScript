//// [tests/cases/compiler/nestedGenerics.ts] ////

//// [nestedGenerics.ts]
interface Foo<T> {
	t: T;
}

var f: Foo<Foo<number>>;

//// [nestedGenerics.js]
var f;
