//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.js]
let C = (() => {
    var _C_instances, _a, _C_method1_get, _C_method1_set;
    let _instanceExtraInitializers = [];
    let _private_get_method1_decorators;
    let _private_get_method1_descriptor;
    let _private_set_method1_decorators;
    let _private_set_method1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        _C_instances = new WeakSet(),
        _C_method1_get = function _C_method1_get() { return _private_get_method1_descriptor.get.call(this); },
        _C_method1_set = function _C_method1_set(value) { return _private_set_method1_descriptor.set.call(this, value); },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_get_method1_decorators = [dec(1)];
            _private_set_method1_decorators = [dec(2)];
            __esDecorate(_a, _private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1", "get") }, _private_get_method1_decorators, { kind: "getter", name: "#method1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), get: obj => __classPrivateFieldGet(obj, _C_instances, "a", _C_method1_get) }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, _private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1", "set") }, _private_set_method1_decorators, { kind: "setter", name: "#method1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), set: (obj, value) => { __classPrivateFieldSet(obj, _C_instances, value, "a", _C_method1_set); } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
