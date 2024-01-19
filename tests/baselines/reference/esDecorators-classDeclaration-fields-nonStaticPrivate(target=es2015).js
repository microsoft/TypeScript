//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivate.js]
let C = (() => {
    var _a, _C_field1;
    let _private_field1_decorators;
    let _private_field1_initializers = [];
    let _private_field1_extraInitializers = [];
    return _a = class C {
            constructor() {
                _C_field1.set(this, __runInitializers(this, _private_field1_initializers, 0));
                __runInitializers(this, _private_field1_extraInitializers);
            }
        },
        _C_field1 = new WeakMap(),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_field1_decorators = [dec];
            __esDecorate(null, null, _private_field1_decorators, { kind: "field", name: "#field1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_field1, obj), get: obj => __classPrivateFieldGet(obj, _C_field1, "f"), set: (obj, value) => { __classPrivateFieldSet(obj, _C_field1, value, "f"); } }, metadata: _metadata }, _private_field1_initializers, _private_field1_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
