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
var _this = this;
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
            C.prototype[(_method1_decorators = [dec], _member_decorators = [dec], "method2")] = function () { };
            C.prototype[(_member_decorators_1 = [dec], _b = __propKey(method3))] = function () { };
            return C;
        }()),
        (function () {
            __esDecorate(_a, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { get: function () { return this.method1; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: "method2", static: false, private: false, access: { get: function () { return this["method2"]; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "method", name: _b, static: false, private: false, access: { get: function () { return this[_b]; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
