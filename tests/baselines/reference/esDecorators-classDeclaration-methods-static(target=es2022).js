//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-static.ts] ////

//// [esDecorators-classDeclaration-methods-static.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) static method1() {}
    @dec(2) static ["method2"]() {}
    @dec(3) static [method3]() {}
}


//// [esDecorators-classDeclaration-methods-static.js]
const method3 = "method3";
let C = (() => {
    var _a;
    let _staticExtraInitializers = [];
    let _static_method1_decorators;
    let _static_member_decorators;
    let _static_member_decorators_1;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(this, null, _static_method1_decorators, { kind: "method", name: "method1", static: true, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_member_decorators, { kind: "method", name: "method2", static: true, private: false, access: { has: obj => "method2" in obj, get: obj => obj["method2"] }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_member_decorators_1, { kind: "method", name: _a, static: true, private: false, access: { has: obj => _a in obj, get: obj => obj[_a] }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(this, _staticExtraInitializers);
        }
        static method1() { }
        static ["method2"]() { }
        static [(_static_method1_decorators = [dec(1)], _static_member_decorators = [dec(2)], _static_member_decorators_1 = [dec(3)], _a = __propKey(method3))]() { }
    };
})();
