//// [esDecorators-classDeclaration-fields-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #field1 = 0;
}

// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}


//// [esDecorators-classDeclaration-fields-staticPrivate.js]
let C = (() => {
    var _a, _C_field1;
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    return _a = class C {
        },
        (() => {
            _static_private_field1_decorators = [dec];
            __esDecorate(null, null, _static_private_field1_decorators, { kind: "field", name: "#field1", static: true, private: true, access: { get() { return __classPrivateFieldGet(this, _a, "f", _C_field1); }, set(value) { __classPrivateFieldSet(this, _a, value, "f", _C_field1); } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _C_field1 = { value: __runInitializers(_a, _static_private_field1_initializers, 0) },
        _a;
})();
let D = (() => {
    var _a, _field1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = (_a = class {
        },
        __setFunctionName(_a, "D"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        })(),
        _field1 = { value: 0 },
        (() => {
            __classPrivateFieldGet(_classThis, _a, "f", _field1);
            __classPrivateFieldSet(_classThis, _a, 1, "f", _field1);
        })(),
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return D;
})();
