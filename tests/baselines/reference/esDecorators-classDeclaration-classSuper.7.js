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
let B = (() => {
    let _instanceExtraInitializers = [];
    let _m_decorators;
    return class B extends A {
        static {
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(this[Symbol.metadata]) : undefined;
            _m_decorators = [foo];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: metadata }, null, _instanceExtraInitializers);
            if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
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
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _get_val_decorators = [foo];
            __esDecorate(this, null, _get_val_decorators, { kind: "getter", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val }, metadata: metadata }, null, _instanceExtraInitializers_1);
            if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
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
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(this[Symbol.metadata]) : undefined;
            _get_val_decorators = [foo];
            __esDecorate(this, null, _get_val_decorators, { kind: "getter", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val }, metadata: metadata }, null, _instanceExtraInitializers_2);
            if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        }
        constructor() {
            super();
            __runInitializers(this, _instanceExtraInitializers_2);
            this.val;
        }
        get val() { return 3; }
    };
})();
