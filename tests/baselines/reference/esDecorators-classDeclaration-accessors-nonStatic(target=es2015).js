//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-nonStatic.ts] ////

//// [esDecorators-classDeclaration-accessors-nonStatic.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(11) get method1() { return 0; }
    @dec(12) set method1(value) {}
    @dec(21) get ["method2"]() { return 0; }
    @dec(22) set ["method2"](value) {}
    @dec(31) get [method3]() { return 0; }
    @dec(32) set [method3](value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStatic.js]
const method3 = "method3";
let C = (() => {
    var _a;
    var _b, _c;
    let _instanceExtraInitializers = [];
    let _get_method1_decorators;
    let _set_method1_decorators;
    let _get_member_decorators;
    let _set_member_decorators;
    let _get_member_decorators_1;
    let _set_member_decorators_1;
    return _a = class C {
            get method1() { return 0; }
            set method1(value) { }
            get ["method2"]() { return 0; }
            set ["method2"](value) { }
            get [(_get_method1_decorators = [dec(11)], _set_method1_decorators = [dec(12)], _get_member_decorators = [dec(21)], _set_member_decorators = [dec(22)], _get_member_decorators_1 = [dec(31)], _b = __propKey(method3))]() { return 0; }
            set [(_set_member_decorators_1 = [dec(32)], _c = __propKey(method3))](value) { }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _get_method1_decorators, { kind: "getter", name: "method1", static: false, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_method1_decorators, { kind: "setter", name: "method1", static: false, private: false, access: { has: obj => "method1" in obj, set: (obj, value) => { obj.method1 = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_member_decorators, { kind: "getter", name: "method2", static: false, private: false, access: { has: obj => "method2" in obj, get: obj => obj["method2"] }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_member_decorators, { kind: "setter", name: "method2", static: false, private: false, access: { has: obj => "method2" in obj, set: (obj, value) => { obj["method2"] = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_member_decorators_1, { kind: "getter", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b] }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_member_decorators_1, { kind: "setter", name: _c, static: false, private: false, access: { has: obj => _c in obj, set: (obj, value) => { obj[_c] = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
