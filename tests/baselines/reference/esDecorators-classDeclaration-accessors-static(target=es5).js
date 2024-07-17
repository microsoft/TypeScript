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
var method3 = "method3";
var C = function () {
    var _a;
    var _b, _c;
    var _staticExtraInitializers = [];
    var _static_get_method1_decorators;
    var _static_set_method1_decorators;
    var _static_get_member_decorators;
    var _static_set_member_decorators;
    var _static_get_member_decorators_1;
    var _static_set_member_decorators_1;
    return _a = /** @class */ (function () {
            function C() {
            }
            Object.defineProperty(C, "method1", {
                get: function () { return 0; },
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C, "method2", {
                get: function () { return 0; },
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C, (_static_get_method1_decorators = [dec(11)], _static_set_method1_decorators = [dec(12)], _static_get_member_decorators = [dec(21)], _static_set_member_decorators = [dec(22)], _static_get_member_decorators_1 = [dec(31)], _b = __propKey(method3)), {
                get: function () { return 0; },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C, (_static_set_member_decorators_1 = [dec(32)], _c = __propKey(method3)), {
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            return C;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _static_get_method1_decorators, { kind: "getter", name: "method1", static: true, private: false, access: { has: function (obj) { return "method1" in obj; }, get: function (obj) { return obj.method1; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_set_method1_decorators, { kind: "setter", name: "method1", static: true, private: false, access: { has: function (obj) { return "method1" in obj; }, set: function (obj, value) { obj.method1 = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_get_member_decorators, { kind: "getter", name: "method2", static: true, private: false, access: { has: function (obj) { return "method2" in obj; }, get: function (obj) { return obj["method2"]; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_set_member_decorators, { kind: "setter", name: "method2", static: true, private: false, access: { has: function (obj) { return "method2" in obj; }, set: function (obj, value) { obj["method2"] = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_get_member_decorators_1, { kind: "getter", name: _b, static: true, private: false, access: { has: function (obj) { return _b in obj; }, get: function (obj) { return obj[_b]; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_set_member_decorators_1, { kind: "setter", name: _c, static: true, private: false, access: { has: function (obj) { return _c in obj; }, set: function (obj, value) { obj[_c] = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
}();
