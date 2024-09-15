//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
let C = (() => {
    var _C_instances, _a, _C_field1_accessor_storage, _C_field1_get, _C_field1_set;
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    let _private_field1_extraInitializers = [];
    let _private_field1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                _C_field1_accessor_storage.set(this, __runInitializers(this, _private_field1_initializers, 0));
                __runInitializers(this, _private_field1_extraInitializers);
            }
        },
        _C_field1_accessor_storage = new WeakMap(),
        _C_instances = new WeakSet(),
        _C_field1_get = function _C_field1_get() { return _private_field1_descriptor.get.call(this); },
        _C_field1_set = function _C_field1_set(value) { return _private_field1_descriptor.set.call(this, value); },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_field1_decorators = [dec];
            __esDecorate(_a, _private_field1_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }, "#field1", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); }, "#field1", "set") }, _private_field1_decorators, { kind: "accessor", name: "#field1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), get: obj => __classPrivateFieldGet(obj, _C_instances, "a", _C_field1_get), set: (obj, value) => { __classPrivateFieldSet(obj, _C_instances, value, "a", _C_field1_set); } }, metadata: _metadata }, _private_field1_initializers, _private_field1_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
