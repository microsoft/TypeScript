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
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    return class C {
        static {
            _static_private_field1_decorators = [dec];
            __esDecorate(null, null, _static_private_field1_decorators, { kind: "field", name: "#field1", static: true, private: true, access: { has: obj => #field1 in obj, get: obj => obj.#field1, set: (obj, value) => { obj.#field1 = value; } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(this, _staticExtraInitializers);
        }
        static #field1 = __runInitializers(this, _static_private_field1_initializers, 0);
    };
})();
let D = (() => {
    var _field1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { __setFunctionName(this, "D"); }
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        }
        static {
            _field1 = { value: 0 };
        }
        static {
            __classPrivateFieldGet(_classThis, _classThis, "f", _field1);
            __classPrivateFieldSet(_classThis, _classThis, 1, "f", _field1);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
