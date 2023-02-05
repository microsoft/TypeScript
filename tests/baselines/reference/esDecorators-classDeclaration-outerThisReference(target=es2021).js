//// [esDecorators-classDeclaration-outerThisReference.ts]
declare let dec: any;

declare let f: any;

// `this` should point to the outer `this` in both cases.
@dec(this)
class A {
    @dec(this)
    b = 2;
}

// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.

@dec(this)
class B {
    // @ts-ignore
    [f(this)] = 1;

    @dec(this)
    b = 2;

    // @ts-ignore
    [f(this)] = 3;
}

// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
@dec(this)
class C {
    #a = 1;

    @dec(this, (x: C) => x.#a)
    b = 2;
}

//// [esDecorators-classDeclaration-outerThisReference.js]
// `this` should point to the outer `this` in both cases.
let A = (() => {
    let _outerThis = this;
    let _classDecorators = [dec(this)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _b_decorators;
    let _b_initializers = [];
    var A = _classThis = class {
        constructor() {
            this.b = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _b_initializers, 2));
        }
    };
    __setFunctionName(_classThis, "A");
    (() => {
        _b_decorators = [dec(_outerThis)];
        __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false }, _b_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        A = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return A = _classThis;
})();
// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.
let B = (() => {
    var _a, _b;
    let _classDecorators_1 = [dec(this)];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _instanceExtraInitializers_1 = [];
    let _b_decorators;
    let _b_initializers = [];
    var B = _classThis_1 = class {
        constructor() {
            // @ts-ignore
            this[_a] = (__runInitializers(this, _instanceExtraInitializers_1), 1);
            this.b = __runInitializers(this, _b_initializers, 2);
            // @ts-ignore
            this[_b] = 3;
        }
    };
    _a = f(this);
    _b = (_b_decorators = [dec(this)], f(this));
    __setFunctionName(_classThis_1, "B");
    (() => {
        __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false }, _b_initializers, _instanceExtraInitializers_1);
        __esDecorate(null, _classDescriptor_1 = { value: _classThis_1 }, _classDecorators_1, { kind: "class", name: _classThis_1.name }, null, _classExtraInitializers_1);
        B = _classThis_1 = _classDescriptor_1.value;
        __runInitializers(_classThis_1, _classExtraInitializers_1);
    })();
    return B = _classThis_1;
})();
// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
let C = (() => {
    var _a;
    let _outerThis_1 = this;
    let _classDecorators_2 = [dec(this)];
    let _classDescriptor_2;
    let _classExtraInitializers_2 = [];
    let _classThis_2;
    let _instanceExtraInitializers_2 = [];
    let _b_decorators;
    let _b_initializers = [];
    var C = _classThis_2 = class {
        constructor() {
            _a.set(this, (__runInitializers(this, _instanceExtraInitializers_2), 1));
            this.b = __runInitializers(this, _b_initializers, 2);
        }
    };
    _a = new WeakMap();
    __setFunctionName(_classThis_2, "C");
    (() => {
        _b_decorators = [dec(_outerThis_1, (x) => __classPrivateFieldGet(x, _a, "f"))];
        __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false }, _b_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, _classDescriptor_2 = { value: _classThis_2 }, _classDecorators_2, { kind: "class", name: _classThis_2.name }, null, _classExtraInitializers_2);
        C = _classThis_2 = _classDescriptor_2.value;
        __runInitializers(_classThis_2, _classExtraInitializers_2);
    })();
    return C = _classThis_2;
})();
