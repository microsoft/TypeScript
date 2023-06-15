//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
let C = (() => {
    let _staticExtraInitializers = [];
    let _static_private_method1_decorators;
    let _static_private_method1_descriptor;
    return class C {
        static {
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _static_private_method1_decorators = [dec];
            __esDecorate(this, _static_private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _static_private_method1_decorators, { kind: "method", name: "#method1", static: true, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 }, metadata: metadata }, null, _staticExtraInitializers);
            if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            __runInitializers(this, _staticExtraInitializers);
        }
        static get #method1() { return _static_private_method1_descriptor.value; }
    };
})();
let D = (() => {
    var _method1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { __setFunctionName(this, "D"); }
        static { _method1 = function _method1() { }; }
        static {
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
