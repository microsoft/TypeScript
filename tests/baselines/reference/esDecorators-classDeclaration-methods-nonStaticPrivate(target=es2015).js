//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
let C = (() => {
    var _C_instances, _a, _C_method1_get;
    let _instanceExtraInitializers = [];
    let _private_method1_decorators;
    let _private_method1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        _C_instances = new WeakSet(),
        _C_method1_get = function _C_method1_get() { return _private_method1_descriptor.value; },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_method1_decorators = [dec];
            __esDecorate(_a, _private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _private_method1_decorators, { kind: "method", name: "#method1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), get: obj => __classPrivateFieldGet(obj, _C_instances, "a", _C_method1_get) }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
