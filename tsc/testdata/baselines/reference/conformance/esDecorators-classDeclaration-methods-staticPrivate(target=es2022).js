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

@dec
class E {
    static #a() {}
    #a() {}
    #b() {}
    static #b() {}
    static #c = 0;
    #c = 0;
    #d = 0;
    static #d = 0;
    static get #e() { return 0; }
    set #e(value: number) {}
    get #f() { return 0; }
    static set #f(value: number) {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
"use strict";
let C = (() => {
    let _staticExtraInitializers = [];
    let _static_private_method1_decorators;
    let _static_private_method1_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_method1_decorators = [dec];
            __esDecorate(this, _static_private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _static_private_method1_decorators, { kind: "method", name: "#method1", static: true, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(this, _staticExtraInitializers);
        }
        static get #method1() { return _static_private_method1_descriptor.value; }
    };
})();
let D = (() => {
    var _D_method1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "D"); }
        static { _D_method1 = function _D_method1() { }; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
let E = (() => {
    var _E_a, _E_b, _E_c, _E_d, _E_e_get, _E_f_set;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var E = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "E"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            E = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static #a() { }
        #a() { }
        #b() { }
        static #b() { }
        static #c = 0;
        #c = 0;
        #d = 0;
        static #d = 0;
        static get #e() { return 0; }
        set #e(value) { }
        get #f() { return 0; }
        static set #f(value) { }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return E = _classThis;
})();
