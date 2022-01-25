// @experimentalDecorators: true

const decorator = (target: typeof A, key: string, index: number) => {};

class A {
	method(@decorator param1: string) {}
	static staticMethod(@decorator param1: string) {}
	constructor(@decorator param1: string) {}
}
