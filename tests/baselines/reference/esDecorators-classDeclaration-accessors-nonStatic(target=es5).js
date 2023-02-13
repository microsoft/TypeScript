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
var _this = this;
var method3 = "method3";
var C = function () {
    var _a;
    var _b, _c;
    var _instanceExtraInitializers = [];
    var _get_method1_decorators;
    var _set_method1_decorators;
    var _get_member_decorators;
    var _set_member_decorators;
    var _get_member_decorators_1;
    var _set_member_decorators_1;
    return _a = /** @class */ (function () {
            function C() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            Object.defineProperty(C.prototype, "method1", {
                get: function () { return 0; },
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C.prototype, "method2", {
                get: function () { return 0; },
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C.prototype, (_get_method1_decorators = [dec(11)], _set_method1_decorators = [dec(12)], _get_member_decorators = [dec(21)], _set_member_decorators = [dec(22)], _get_member_decorators_1 = [dec(31)], _b = __propKey(method3)), {
                get: function () { return 0; },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C.prototype, (_set_member_decorators_1 = [dec(32)], _c = __propKey(method3)), {
                set: function (value) { },
                enumerable: false,
                configurable: true
            });
            return C;
        }()),
        (function () {
            __esDecorate(_a, null, _get_method1_decorators, { kind: "getter", name: "method1", static: false, private: false, access: { has: function (obj) { return "method1" in obj; }, get: function (obj) { return obj.method1; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_method1_decorators, { kind: "setter", name: "method1", static: false, private: false, access: { has: function (obj) { return "method1" in obj; }, set: function (obj, value) { obj.method1 = value; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_member_decorators, { kind: "getter", name: "method2", static: false, private: false, access: { has: function (obj) { return "method2" in obj; }, get: function (obj) { return obj["method2"]; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_member_decorators, { kind: "setter", name: "method2", static: false, private: false, access: { has: function (obj) { return "method2" in obj; }, set: function (obj, value) { obj["method2"] = value; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_member_decorators_1, { kind: "getter", name: _b, static: false, private: false, access: { has: function (obj) { return _b in obj; }, get: function (obj) { return obj[_b]; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_member_decorators_1, { kind: "setter", name: _c, static: false, private: false, access: { has: function (obj) { return _c in obj; }, set: function (obj, value) { obj[_c] = value; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
