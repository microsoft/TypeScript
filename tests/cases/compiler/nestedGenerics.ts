// @target: es2015
interface Foo<T> {
	t: T;
}

var f: Foo<Foo<number>>;