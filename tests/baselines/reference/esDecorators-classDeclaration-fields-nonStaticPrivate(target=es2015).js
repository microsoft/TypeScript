//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivate.js]
let C = (() => {
    var _a, _C_field1;
    let _instanceExtraInitializers = [];
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    return _a = class C {
            constructor() {
                _C_field1.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_field1_initializers, 0)));
            }
        },
        _C_field1 = new WeakMap(),
        (() => {
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _private_field1_decorators = [dec];
            __esDecorate(null, null, _private_field1_decorators, { kind: "field", name: "#field1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_field1, obj), get: obj => __classPrivateFieldGet(obj, _C_field1, "f"), set: (obj, value) => { __classPrivateFieldSet(obj, _C_field1, value, "f"); } }, metadata: metadata }, _private_field1_initializers, _instanceExtraInitializers);
            if (metadata) Object.defineProperty(_a, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        })(),
        _a;
})();
