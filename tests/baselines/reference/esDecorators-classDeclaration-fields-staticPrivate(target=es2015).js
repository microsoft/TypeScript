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
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_extraInitializers = [];
    return _a = class C {
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_field1_decorators = [dec];
            __esDecorate(null, null, _static_private_field1_decorators, { kind: "field", name: "#field1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "f", _C_field1), set: (obj, value) => { __classPrivateFieldSet(obj, _a, value, "f", _C_field1); } }, metadata: _metadata }, _static_private_field1_initializers, _static_private_field1_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _C_field1 = { value: __runInitializers(_a, _static_private_field1_initializers, 0) },
        (() => {
            __runInitializers(_a, _static_private_field1_extraInitializers);
        })(),
        _a;
})();
let D = (() => {
    var _D_field1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    __setFunctionName(_classThis, "D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _D_field1 = { value: 0 };
    (() => {
        __classPrivateFieldGet(_classThis, _classThis, "f", _D_field1);
        __classPrivateFieldSet(_classThis, _classThis, 1, "f", _D_field1);
    })();
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
