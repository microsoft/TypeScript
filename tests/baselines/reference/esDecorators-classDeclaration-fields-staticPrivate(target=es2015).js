//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-fields-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #field1 = 0;
}

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
            __esDecorate(null, null, _static_private_field1_decorators, { kind: "field", name: "#field1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "f", _C_field1), set: (obj, value) => { __classPrivateFieldSet(obj, _a, value, "f", _C_field1); } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _C_field1 = { value: __runInitializers(_a, _static_private_field1_initializers, 0) },
        _a;
})();
let D = (() => {
    var _field1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    __setFunctionName(_classThis, "D");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
    })();
    _field1 = { value: 0 };
    (() => {
        __classPrivateFieldGet(_classThis, _classThis, "f", _field1);
        __classPrivateFieldSet(_classThis, _classThis, 1, "f", _field1);
    })();
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
