// @experimentalDecorators: true
// @strictNullChecks: true

const decorator = (target: any, key: undefined, index: number) => {};

class A {
	constructor(@decorator param1: string) {}
	method(@decorator param1: string) {}
}
