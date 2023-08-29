//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-staticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) static get #method1() { return 0; }
    @dec(2) static set #method1(value) {}
}

@dec
class D {
    static get #method1() { return 0; }
    static set #method1(value) {}
    static {
        this.#method1;
        this.#method1 = 1;
    }
}


//// [esDecorators-classDeclaration-accessors-staticPrivate.js]
let C = (() => {
    var _a, _C_method1_get, _C_method1_set;
    let _staticExtraInitializers = [];
    let _static_private_get_method1_decorators;
    let _static_private_get_method1_descriptor;
    let _static_private_set_method1_decorators;
    let _static_private_set_method1_descriptor;
    return _a = class C {
        },
        _C_method1_get = function _C_method1_get() { return _static_private_get_method1_descriptor.get.call(this); },
        _C_method1_set = function _C_method1_set(value) { return _static_private_set_method1_descriptor.set.call(this, value); },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_get_method1_decorators = [dec(1)];
            _static_private_set_method1_decorators = [dec(2)];
            __esDecorate(_a, _static_private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1", "get") }, _static_private_get_method1_decorators, { kind: "getter", name: "#method1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), get: obj => __classPrivateFieldGet(obj, _a, "a", _C_method1_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, _static_private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1", "set") }, _static_private_set_method1_decorators, { kind: "setter", name: "#method1", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_a, obj), set: (obj, value) => { __classPrivateFieldSet(obj, _a, value, "a", _C_method1_set); } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
let D = (() => {
    var _D_method1_get, _D_method1_set;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
    };
    _D_method1_get = function _D_method1_get() { return 0; };
    _D_method1_set = function _D_method1_set(value) { };
    __setFunctionName(_classThis, "D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    (() => {
        __classPrivateFieldGet(_classThis, _classThis, "a", _D_method1_get);
        __classPrivateFieldSet(_classThis, _classThis, 1, "a", _D_method1_set);
    })();
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
