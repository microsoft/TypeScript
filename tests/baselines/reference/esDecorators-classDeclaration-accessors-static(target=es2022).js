//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-static.ts] ////

//// [esDecorators-classDeclaration-accessors-static.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(11) static get method1() { return 0; }
    @dec(12) static set method1(value) {}
    @dec(21) static get ["method2"]() { return 0; }
    @dec(22) static set ["method2"](value) {}
    @dec(31) static get [method3]() { return 0; }
    @dec(32) static set [method3](value) {}
}


//// [esDecorators-classDeclaration-accessors-static.js]
const method3 = "method3";
let C = (() => {
    var _a, _b;
    let _staticExtraInitializers = [];
    let _static_get_method1_decorators;
    let _static_set_method1_decorators;
    let _static_get_member_decorators;
    let _static_set_member_decorators;
    let _static_get_member_decorators_1;
    let _static_set_member_decorators_1;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(this, null, _static_get_method1_decorators, { kind: "getter", name: "method1", static: true, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_set_method1_decorators, { kind: "setter", name: "method1", static: true, private: false, access: { has: obj => "method1" in obj, set: (obj, value) => { obj.method1 = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_get_member_decorators, { kind: "getter", name: "method2", static: true, private: false, access: { has: obj => "method2" in obj, get: obj => obj["method2"] }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_set_member_decorators, { kind: "setter", name: "method2", static: true, private: false, access: { has: obj => "method2" in obj, set: (obj, value) => { obj["method2"] = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_get_member_decorators_1, { kind: "getter", name: _a, static: true, private: false, access: { has: obj => _a in obj, get: obj => obj[_a] }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_set_member_decorators_1, { kind: "setter", name: _b, static: true, private: false, access: { has: obj => _b in obj, set: (obj, value) => { obj[_b] = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(this, _staticExtraInitializers);
        }
        static get method1() { return 0; }
        static set method1(value) { }
        static get ["method2"]() { return 0; }
        static set ["method2"](value) { }
        static get [(_static_get_method1_decorators = [dec(11)], _static_set_method1_decorators = [dec(12)], _static_get_member_decorators = [dec(21)], _static_set_member_decorators = [dec(22)], _static_get_member_decorators_1 = [dec(31)], _a = __propKey(method3))]() { return 0; }
        static set [(_static_set_member_decorators_1 = [dec(32)], _b = __propKey(method3))](value) { }
    };
})();
