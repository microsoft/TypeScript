//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.js]
let C = (() => {
    var _C_instances, _a, _C_method1_get, _C_method1_set;
    let _instanceExtraInitializers = [];
    let _private_get_method1_decorators;
    let _private_get_method1_descriptor;
    let _private_set_method1_decorators;
    let _private_set_method1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        _C_instances = new WeakSet(),
        _C_method1_get = function _C_method1_get() { return _private_get_method1_descriptor.get.call(this); },
        _C_method1_set = function _C_method1_set(value) { return _private_set_method1_descriptor.set.call(this, value); },
        (() => {
            _private_get_method1_decorators = [dec(1)];
            _private_set_method1_decorators = [dec(2)];
            __esDecorate(_a, _private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1", "get") }, _private_get_method1_decorators, { kind: "getter", name: "#method1", static: false, private: true }, null, _instanceExtraInitializers);
            __esDecorate(_a, _private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1", "set") }, _private_set_method1_decorators, { kind: "setter", name: "#method1", static: false, private: true }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
