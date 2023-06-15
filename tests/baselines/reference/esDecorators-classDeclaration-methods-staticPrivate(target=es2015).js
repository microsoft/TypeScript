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
    var _a, _C_method1_get;
    let _staticExtraInitializers = [];
    let _static_private_method1_decorators;
    let _static_private_method1_descriptor;
    return _a = class C {
        },
        _C_method1_get = function _C_method1_get() { return _static_private_method1_descriptor.value; },
        (() => {
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _static_private_method1_decorators = [dec];
            __esDecorate(_a, _static_private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _static_private_method1_decorators, { kind: "method", name: "#method1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "a", _C_method1_get) }, metadata: metadata }, null, _staticExtraInitializers);
            if (metadata) Object.defineProperty(_a, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
let D = (() => {
    var _method1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    _method1 = function _method1() { };
    __setFunctionName(_classThis, "D");
    (() => {
        const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: metadata }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
        if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
