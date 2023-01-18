//// [esDecorators-classDeclaration-methods-nonStatic.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) method1() {}
    @dec(2) ["method2"]() {}
    @dec(3) [method3]() {}
}


//// [esDecorators-classDeclaration-methods-nonStatic.js]
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
            C.prototype["method2"] = function () { };
            C.prototype[(_method1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _b = __propKey(method3))] = function () { };
            return C;
        }()),
        (function () {
            __esDecorate(_a, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: "method2", static: false, private: false }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "method", name: _b, static: false, private: false }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
