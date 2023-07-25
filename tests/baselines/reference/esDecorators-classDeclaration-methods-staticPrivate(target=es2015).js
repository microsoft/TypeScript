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
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_method1_decorators = [dec];
            __esDecorate(_a, _static_private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _static_private_method1_decorators, { kind: "method", name: "#method1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "a", _C_method1_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
let D = (() => {
    var _D_method1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    _D_method1 = function _D_method1() { };
    __setFunctionName(_classThis, "D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
