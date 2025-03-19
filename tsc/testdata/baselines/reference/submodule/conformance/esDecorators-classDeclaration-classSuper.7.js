//// [tests/cases/conformance/esDecorators/classDeclaration/classSuper/esDecorators-classDeclaration-classSuper.7.ts] ////

//// [esDecorators-classDeclaration-classSuper.7.ts]
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


//// [esDecorators-classDeclaration-classSuper.7.js]
class A {
}
class B extends A {
    constructor() {
        'inject';
        'inject';
        super();
        const a = 1;
        const b = 1;
    }
    @foo
    m() { }
}
function foo(method, _context) {
    return function () {
        method.call(this);
    };
}
new B();
// https://github.com/microsoft/TypeScript/issues/53448
class C {
    constructor() {
        this.val;
    }
    @foo
    get val() { return 3; }
}
class D extends A {
    constructor() {
        super();
        this.val;
    }
    @foo
    get val() { return 3; }
}
