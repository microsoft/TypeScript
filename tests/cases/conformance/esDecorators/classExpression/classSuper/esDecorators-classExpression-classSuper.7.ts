// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

class A {}
class B extends A {
	public constructor() {
		super();
	}

	@foo
	public m(): void {}
}

function foo(method: any, _context: any): any {
	return function (this: any) {
		method.call(this);
	};
}

new B();
