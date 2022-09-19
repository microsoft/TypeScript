//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec static accessor #field1 = 0;
}

// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static accessor #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}


//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.js]
let C = (() => {
    var _a, _C_field1_get, _C_field1_set, _C_field1_accessor_storage;
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_descriptor;
    return _a = class C {
        },
        _C_field1_get = function _C_field1_get() { return __classPrivateFieldGet(this, _a, "f", _C_field1_accessor_storage); },
        _C_field1_set = function _C_field1_set(value) { __classPrivateFieldSet(this, _a, value, "f", _C_field1_accessor_storage); },
        (() => {
            _static_private_field1_decorators = [dec];
            __esDecorate(_a, _static_private_field1_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(_a, _a, "f", _C_field1_accessor_storage); }, "#field1"), set: __setFunctionName(function (value) { __classPrivateFieldSet(_a, _a, value, "f", _C_field1_accessor_storage); }, "#field1") }, _static_private_field1_decorators, { kind: "accessor", name: "#field1", static: true, private: true, access: { get() { return __classPrivateFieldGet(this, _a, "a", _C_field1_get); }, set(value) { __classPrivateFieldSet(this, _a, value, "a", _C_field1_set); } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _C_field1_accessor_storage = { value: __runInitializers(_a, _static_private_field1_initializers, 0) },
        _a;
})();
let D = (() => {
    var _a, _field1_get, _field1_set, _field1_1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = (_a = class {
        },
        _field1_get = function _field1_get() { return __classPrivateFieldGet(this, _a, "f", _field1_1_accessor_storage); },
        _field1_set = function _field1_set(value) { __classPrivateFieldSet(this, _a, value, "f", _field1_1_accessor_storage); },
        __setFunctionName(_a, "D"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        })(),
        _field1_1_accessor_storage = { value: 0 },
        (() => {
            __classPrivateFieldGet(_classThis, _a, "a", _field1_get);
            __classPrivateFieldSet(_classThis, _a, 1, "a", _field1_set);
        })(),
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return D = _classThis;
})();
