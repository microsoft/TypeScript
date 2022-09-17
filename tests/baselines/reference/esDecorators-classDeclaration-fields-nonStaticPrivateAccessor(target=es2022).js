//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    let _private_field1_descriptor;
    return class C {
        static {
            _private_field1_decorators = [dec];
            __esDecorate(this, _private_field1_descriptor = { get: __setFunctionName(function () { return this.#field1_accessor_storage; }, "#field1"), set: __setFunctionName(function (value) { this.#field1_accessor_storage = value; }, "#field1") }, _private_field1_decorators, { kind: "accessor", name: "#field1", static: false, private: true, access: { get() { return this.#field1; }, set(value) { this.#field1 = value; } } }, _private_field1_initializers, _instanceExtraInitializers);
        }
        #field1_accessor_storage = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_field1_initializers, 0));
        get #field1() { return this.#field1_accessor_storage; }
        set #field1(value) { this.#field1_accessor_storage = value; }
    };
})();
