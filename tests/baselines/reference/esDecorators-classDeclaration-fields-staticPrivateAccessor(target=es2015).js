//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec static accessor #field1 = 0;
}

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
    var _a, _C_field1_accessor_storage, _C_field1_get, _C_field1_set;
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_descriptor;
    return _a = class C {
        },
        _C_field1_get = function _C_field1_get() { return _static_private_field1_descriptor.get.call(this); },
        _C_field1_set = function _C_field1_set(value) { return _static_private_field1_descriptor.set.call(this, value); },
        (() => {
            _static_private_field1_decorators = [dec];
            __esDecorate(_a, _static_private_field1_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(_a, _a, "f", _C_field1_accessor_storage); }, "#field1", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(_a, _a, value, "f", _C_field1_accessor_storage); }, "#field1", "set") }, _static_private_field1_decorators, { kind: "accessor", name: "#field1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "a", _C_field1_get), set: (obj, value) => { __classPrivateFieldSet(obj, _a, value, "a", _C_field1_set); } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _C_field1_accessor_storage = { value: __runInitializers(this, _static_private_field1_initializers, 0) },
        _a;
})();
let D = (() => {
    var _field1_get, _field1_set, _field1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    _field1_get = function _field1_get() { return __classPrivateFieldGet(this, _classThis, "f", _field1_accessor_storage); };
    _field1_set = function _field1_set(value) { __classPrivateFieldSet(this, _classThis, value, "f", _field1_accessor_storage); };
    __setFunctionName(_classThis, "D");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
    })();
    _field1_accessor_storage = { value: 0 };
    (() => {
        __classPrivateFieldGet(_classThis, _classThis, "a", _field1_get);
        __classPrivateFieldSet(_classThis, _classThis, 1, "a", _field1_set);
    })();
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
