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
var method3 = "method3";
var C = function () {
    var _a;
    var _b;
    var _instanceExtraInitializers = [];
    var _method1_decorators;
    var _member_decorators;
    var _member_decorators_1;
    return _a = /** @class */ (function () {
            function C() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            C.prototype.method1 = function () { };
            C.prototype["method2"] = function () { };
            C.prototype[(_method1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _b = __propKey(method3))] = function () { };
            return C;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { has: function (obj) { return "method1" in obj; }, get: function (obj) { return obj.method1; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: "method2", static: false, private: false, access: { has: function (obj) { return "method2" in obj; }, get: function (obj) { return obj["method2"]; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "method", name: _b, static: false, private: false, access: { has: function (obj) { return _b in obj; }, get: function (obj) { return obj[_b]; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
