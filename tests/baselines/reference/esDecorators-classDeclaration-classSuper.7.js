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
let B = (() => {
    let _instanceExtraInitializers = [];
    let _m_decorators;
    return class B extends A {
        static {
            _m_decorators = [foo];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m } }, null, _instanceExtraInitializers);
        }
        constructor() {
            'inject';
            super();
            __runInitializers(this, _instanceExtraInitializers);
            const a = 1;
            const b = 1;
        }
        m() { }
    };
})();
function foo(method, _context) {
    return function () {
        method.call(this);
    };
}
new B();
// https://github.com/microsoft/TypeScript/issues/53448
let C = (() => {
    let _instanceExtraInitializers_1 = [];
    let _get_val_decorators;
    return class C {
        static {
            _get_val_decorators = [foo];
            __esDecorate(this, null, _get_val_decorators, { kind: "getter", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val } }, null, _instanceExtraInitializers_1);
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers_1);
            this.val;
        }
        get val() { return 3; }
    };
})();
let D = (() => {
    let _instanceExtraInitializers_2 = [];
    let _get_val_decorators;
    return class D extends A {
        static {
            _get_val_decorators = [foo];
            __esDecorate(this, null, _get_val_decorators, { kind: "getter", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val } }, null, _instanceExtraInitializers_2);
        }
        constructor() {
            super();
            __runInitializers(this, _instanceExtraInitializers_2);
            this.val;
        }
        get val() { return 3; }
    };
})();
