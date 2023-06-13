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
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_descriptor;
    return class C {
        static {
            _static_private_field1_decorators = [dec];
            __esDecorate(this, _static_private_field1_descriptor = { get: __setFunctionName(function () { return this.#field1_accessor_storage; }, "#field1", "get"), set: __setFunctionName(function (value) { this.#field1_accessor_storage = value; }, "#field1", "set") }, _static_private_field1_decorators, { kind: "accessor", name: "#field1", static: true, private: true, access: { has: obj => #field1 in obj, get: obj => obj.#field1, set: (obj, value) => { obj.#field1 = value; } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(this, _staticExtraInitializers);
        }
        static #field1_accessor_storage = __runInitializers(this, _static_private_field1_initializers, 0);
        static get #field1() { return _static_private_field1_descriptor.get.call(this); }
        static set #field1(value) { return _static_private_field1_descriptor.set.call(this, value); }
    };
})();
let D = (() => {
    var _field1_get, _field1_set, _field1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { __setFunctionName(this, "D"); }
        static { _field1_get = function _field1_get() { return __classPrivateFieldGet(this, _classThis, "f", _field1_accessor_storage); }, _field1_set = function _field1_set(value) { __classPrivateFieldSet(this, _classThis, value, "f", _field1_accessor_storage); }; }
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        }
        static {
            _field1_accessor_storage = { value: 0 };
        }
        static {
            __classPrivateFieldGet(_classThis, _classThis, "a", _field1_get);
            __classPrivateFieldSet(_classThis, _classThis, 1, "a", _field1_set);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
