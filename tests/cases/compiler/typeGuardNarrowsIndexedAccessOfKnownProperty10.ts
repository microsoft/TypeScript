// @strict: true

interface Foo { bar: any; }
const bar: { [id: string]: number } = {};

(foo: Foo) => {
	bar[id]++;
	const id = foo.bar;
}
