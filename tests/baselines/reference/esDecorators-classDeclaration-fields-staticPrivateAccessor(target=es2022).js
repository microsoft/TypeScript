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
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_extraInitializers = [];
    let _static_private_field1_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_field1_decorators = [dec];
            __esDecorate(this, _static_private_field1_descriptor = { get: __setFunctionName(function () { return this.#field1_accessor_storage; }, "#field1", "get"), set: __setFunctionName(function (value) { this.#field1_accessor_storage = value; }, "#field1", "set") }, _static_private_field1_decorators, { kind: "accessor", name: "#field1", static: true, private: true, access: { has: obj => #field1 in obj, get: obj => obj.#field1, set: (obj, value) => { obj.#field1 = value; } }, metadata: _metadata }, _static_private_field1_initializers, _static_private_field1_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static #field1_accessor_storage = __runInitializers(this, _static_private_field1_initializers, 0);
        static get #field1() { return _static_private_field1_descriptor.get.call(this); }
        static set #field1(value) { return _static_private_field1_descriptor.set.call(this, value); }
        static {
            __runInitializers(this, _static_private_field1_extraInitializers);
        }
    };
})();
let D = (() => {
    var _D_field1_get, _D_field1_set, _D_field1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "D"); }
        static { _D_field1_get = function _D_field1_get() { return __classPrivateFieldGet(_classThis, _classThis, "f", _D_field1_accessor_storage); }, _D_field1_set = function _D_field1_set(value) { __classPrivateFieldSet(_classThis, _classThis, value, "f", _D_field1_accessor_storage); }; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            _D_field1_accessor_storage = { value: 0 };
        }
        static {
            __classPrivateFieldGet(_classThis, _classThis, "a", _D_field1_get);
            __classPrivateFieldSet(_classThis, _classThis, 1, "a", _D_field1_set);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
