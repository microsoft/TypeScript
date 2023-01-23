//// [esDecorators-classDeclaration-nonStatic-methods.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec
    method1() {}

    @dec
    ["method2"]() {}

    @dec
    [method3]() {}
}


//// [esDecorators-classDeclaration-nonStatic-methods.js]
const method3 = "method3";
let C = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _method1_decorators;
    let _member_decorators;
    let _member_decorators_1;
    return class C {
        static {
            __esDecorate(this, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { get() { return this.method1; } } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _member_decorators, { kind: "method", name: "method2", static: false, private: false, access: { get() { return this["method2"]; } } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _member_decorators_1, { kind: "method", name: _a, static: false, private: false, access: { get() { return this[_a]; } } }, null, _instanceExtraInitializers);
        }
        method1() { }
        [(_method1_decorators = [dec], _member_decorators = [dec], "method2")]() { }
        [(_member_decorators_1 = [dec], _a = __propKey(method3))]() { }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
