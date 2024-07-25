//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
let C = (() => {
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    let _private_field1_extraInitializers = [];
    let _private_field1_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_field1_decorators = [dec];
            __esDecorate(this, _private_field1_descriptor = { get: __setFunctionName(function () { return this.#field1_accessor_storage; }, "#field1", "get"), set: __setFunctionName(function (value) { this.#field1_accessor_storage = value; }, "#field1", "set") }, _private_field1_decorators, { kind: "accessor", name: "#field1", static: false, private: true, access: { has: obj => #field1 in obj, get: obj => obj.#field1, set: (obj, value) => { obj.#field1 = value; } }, metadata: _metadata }, _private_field1_initializers, _private_field1_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #field1_accessor_storage = __runInitializers(this, _private_field1_initializers, 0);
        get #field1() { return _private_field1_descriptor.get.call(this); }
        set #field1(value) { return _private_field1_descriptor.set.call(this, value); }
        constructor() {
            __runInitializers(this, _private_field1_extraInitializers);
        }
    };
})();
