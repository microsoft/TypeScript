//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
let C = (() => {
    var _C_instances, _a, _C_field1_get, _C_field1_set, _C_field1_accessor_storage;
    let _instanceExtraInitializers = [];
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    let _private_field1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                _C_field1_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_field1_initializers, 0)));
            }
        },
        _C_instances = new WeakSet(),
        _C_field1_accessor_storage = new WeakMap(),
        _C_field1_get = function _C_field1_get() { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); },
        _C_field1_set = function _C_field1_set(value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); },
        (() => {
            _private_field1_decorators = [dec];
            __esDecorate(_a, _private_field1_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }, "#field1"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); }, "#field1") }, _private_field1_decorators, { kind: "accessor", name: "#field1", static: false, private: true, access: { get() { return __classPrivateFieldGet(this, _C_instances, "a", _C_field1_get); }, set(value) { __classPrivateFieldSet(this, _C_instances, value, "a", _C_field1_set); } } }, _private_field1_initializers, _instanceExtraInitializers);
        })(),
        _a;
})();
