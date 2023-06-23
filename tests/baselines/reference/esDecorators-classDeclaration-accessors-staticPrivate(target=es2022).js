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
    let _staticExtraInitializers = [];
    let _static_private_get_method1_decorators;
    let _static_private_get_method1_descriptor;
    let _static_private_set_method1_decorators;
    let _static_private_set_method1_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_get_method1_decorators = [dec(1)];
            _static_private_set_method1_decorators = [dec(2)];
            __esDecorate(this, _static_private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1", "get") }, _static_private_get_method1_decorators, { kind: "getter", name: "#method1", static: true, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1", "set") }, _static_private_set_method1_decorators, { kind: "setter", name: "#method1", static: true, private: true, access: { has: obj => #method1 in obj, set: (obj, value) => { obj.#method1 = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(this, _staticExtraInitializers);
        }
        static get #method1() { return _static_private_get_method1_descriptor.get.call(this); }
        static set #method1(value) { return _static_private_set_method1_descriptor.set.call(this, value); }
    };
})();
let D = (() => {
    var _D_method1_get, _D_method1_set;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "D"); }
        static { _D_method1_get = function _D_method1_get() { return 0; }, _D_method1_set = function _D_method1_set(value) { }; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            __classPrivateFieldGet(_classThis, _classThis, "a", _D_method1_get);
            __classPrivateFieldSet(_classThis, _classThis, 1, "a", _D_method1_set);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
