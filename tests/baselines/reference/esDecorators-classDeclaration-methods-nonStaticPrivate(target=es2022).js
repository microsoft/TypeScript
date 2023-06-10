//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_method1_decorators;
    let _private_method1_descriptor;
    return class C {
        static {
            _private_method1_decorators = [dec];
            __esDecorate(this, _private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _private_method1_decorators, { kind: "method", name: "#method1", static: false, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 } }, null, _instanceExtraInitializers);
        }
        get #method1() { return _private_method1_descriptor.value; }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
