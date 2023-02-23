//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_get_method1_decorators;
    let _private_get_method1_descriptor;
    let _private_set_method1_decorators;
    let _private_set_method1_descriptor;
    return class C {
        static {
            _private_get_method1_decorators = [dec(1)];
            _private_set_method1_decorators = [dec(2)];
            __esDecorate(this, _private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1", "get") }, _private_get_method1_decorators, { kind: "getter", name: "#method1", static: false, private: true, access: { has: obj => #method1 in obj, get: obj => obj.#method1 } }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1", "set") }, _private_set_method1_decorators, { kind: "setter", name: "#method1", static: false, private: true, access: { has: obj => #method1 in obj, set: (obj, value) => { obj.#method1 = value; } } }, null, _instanceExtraInitializers);
        }
        get #method1() { return _private_get_method1_descriptor.get.call(this); }
        set #method1(value) { return _private_set_method1_descriptor.set.call(this, value); }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
