//// [classExpressionWithStaticProperties1.ts]
var v = class C {
    static a = 1;
    static b = 2;
    static c = C.a + C.b;
};

//// [classExpressionWithStaticProperties1.js]
var _a;
var v = (_a = /** @class */ (function () {
        function C() {
        }
        return C;
    }()),
    _a.a = 1,
    _a.b = 2,
    _a.c = _a.a + _a.b,
    _a);
