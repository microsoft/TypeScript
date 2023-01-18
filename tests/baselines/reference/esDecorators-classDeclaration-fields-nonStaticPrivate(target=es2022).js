//// [esDecorators-classDeclaration-fields-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivate.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    return class C {
        static {
            _private_field1_decorators = [dec];
            __esDecorate(null, null, _private_field1_decorators, { kind: "field", name: "#field1", static: false, private: true }, _private_field1_initializers, _instanceExtraInitializers);
        }
        #field1 = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_field1_initializers, 0));
    };
})();
