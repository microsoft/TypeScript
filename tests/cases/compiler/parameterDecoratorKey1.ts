// @experimentalDecorators: true

const decorator = (target: any, key: "foo", index: number) => {};

class A {
	foo(@decorator param1: string) {}
	bar(@decorator param1: string) {}
}
