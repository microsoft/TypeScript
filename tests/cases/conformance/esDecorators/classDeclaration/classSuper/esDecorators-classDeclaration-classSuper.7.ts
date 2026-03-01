// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

class A {}
class B extends A {
	public constructor() {
		'inject';
		super();
		const a = 1;
		const b = 1;
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

// https://github.com/microsoft/TypeScript/issues/53448
class C {
	public constructor() {
		this.val;
	}

	@foo
	public get val(): number { return 3; }
}
class D extends A {
	public constructor() {
		super();
		this.val;
	}

	@foo
	public get val(): number { return 3; }
}
