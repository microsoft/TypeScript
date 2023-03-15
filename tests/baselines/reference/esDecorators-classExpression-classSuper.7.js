//// [esDecorators-classExpression-classSuper.7.ts]
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


//// [esDecorators-classExpression-classSuper.7.js]
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
            super();
            __runInitializers(this, _instanceExtraInitializers);
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
