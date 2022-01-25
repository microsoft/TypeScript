// @experimentalDecorators: true

const decorator = (target: any, key: string, index: 0) => {};

class A {
	method(
		@decorator param1: string,
		@decorator param2: string
	) {}
}
