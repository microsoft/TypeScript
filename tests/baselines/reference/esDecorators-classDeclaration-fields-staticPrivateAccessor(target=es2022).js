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
    let _staticExtraInitializers = [];
    let _static_private_field1_decorators;
    let _static_private_field1_initializers = [];
    let _static_private_field1_descriptor;
    return class C {
        static {
            _static_private_field1_decorators = [dec];
            __esDecorate(this, _static_private_field1_descriptor = { get: __setFunctionName(function () { return this.#field1_accessor_storage; }, "#field1"), set: __setFunctionName(function (value) { this.#field1_accessor_storage = value; }, "#field1") }, _static_private_field1_decorators, { kind: "accessor", name: "#field1", static: true, private: true, access: { get() { return this.#field1; }, set(value) { this.#field1 = value; } } }, _static_private_field1_initializers, _staticExtraInitializers);
            __runInitializers(this, _staticExtraInitializers);
        }
        static #field1_accessor_storage = __runInitializers(this, _static_private_field1_initializers, 0);
        static get #field1() { return this.#field1_accessor_storage; }
        static set #field1(value) { this.#field1_accessor_storage = value; }
    };
})();
let D = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        }
        static #field1_1_accessor_storage = 0;
        static get #field1() { return this.#field1_1_accessor_storage; }
        static set #field1(value) { this.#field1_1_accessor_storage = value; }
        static {
            _classThis.#field1;
            _classThis.#field1 = 1;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D;
})();
