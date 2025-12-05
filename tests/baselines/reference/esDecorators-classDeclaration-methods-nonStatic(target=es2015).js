//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStatic.ts] ////

//// [esDecorators-classDeclaration-methods-nonStatic.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) method1() {}
    @dec(2) ["method2"]() {}
    @dec(3) [method3]() {}
}


//// [esDecorators-classDeclaration-methods-nonStatic.js]
const method3 = "method3";
let C = (() => {
    var _a;
    var _b;
    let _instanceExtraInitializers = [];
    let _method1_decorators;
    let _member_decorators;
    let _member_decorators_1;
    return _a = class C {
            method1() { }
            ["method2"]() { }
            [(_method1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _b = __propKey(method3))]() { }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: "method2", static: false, private: false, access: { has: obj => "method2" in obj, get: obj => obj["method2"] }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "method", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b] }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
