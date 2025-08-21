//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-outerThisReference.ts] ////

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
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    var A = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _b_decorators = [dec(_outerThis)];
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            A = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        b = __runInitializers(this, _b_initializers, 2);
        constructor() {
            __runInitializers(this, _b_extraInitializers);
        }
    };
    return A = _classThis;
})();
// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.
let B = (() => {
    let _classDecorators = [dec(this)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    var B = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            B = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // @ts-ignore
        [f(this)] = 1;
        b = __runInitializers(this, _b_initializers, 2);
        // @ts-ignore
        [(_b_decorators = [dec(this)], f(this))] = (__runInitializers(this, _b_extraInitializers), 3);
    };
    return B = _classThis;
})();
// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
let C = (() => {
    let _outerThis_1 = this;
    let _classDecorators = [dec(this)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    var C = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _b_decorators = [dec(_outerThis_1, (x) => x.#a)];
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        #a = 1;
        b = __runInitializers(this, _b_initializers, 2);
        constructor() {
            __runInitializers(this, _b_extraInitializers);
        }
    };
    return C = _classThis;
})();
