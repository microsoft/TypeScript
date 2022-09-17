//// [esDecorators-classDeclaration-accessors-staticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) static get #method1() { return 0; }
    @dec(2) static set #method1(value) {}
}

// TODO: We should translate these to weakmaps when < ESNext
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
            _static_private_get_method1_decorators = [dec(1)];
            _static_private_set_method1_decorators = [dec(2)];
            __esDecorate(_a, _static_private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1") }, _static_private_get_method1_decorators, { kind: "getter", name: "#method1", static: true, private: true, access: { get() { return __classPrivateFieldGet(this, _a, "a", _C_method1_get); } } }, null, _staticExtraInitializers);
            __esDecorate(_a, _static_private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1") }, _static_private_set_method1_decorators, { kind: "setter", name: "#method1", static: true, private: true, access: { set(value) { __classPrivateFieldSet(this, _a, value, "a", _C_method1_set); } } }, null, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
let D = (() => {
    var _a, _method1_get, _method1_set;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = (_a = class {
        },
        _method1_get = function _method1_get() { return 0; },
        _method1_set = function _method1_set(value) { },
        __setFunctionName(_a, "D"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        })(),
        (() => {
            __classPrivateFieldGet(_classThis, _a, "a", _method1_get);
            __classPrivateFieldSet(_classThis, _a, 1, "a", _method1_set);
        })(),
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return D;
})();
