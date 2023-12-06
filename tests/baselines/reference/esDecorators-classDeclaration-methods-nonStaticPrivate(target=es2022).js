//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_method1_decorators;
    let _private_method1_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_method1_decorators = [dec];
            __esDecorate(this, _private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _private_method1_decorators, { kind: "method", name: "#method1", static: false, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get #method1() { return _private_method1_descriptor.value; }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
