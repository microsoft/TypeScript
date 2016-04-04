//// [classExpressionWithStaticProperties2.ts]
var v = class C { static a = 1; static b };

//// [classExpressionWithStaticProperties2.js]
var v = (_a = (function () {
    function C() {
    }
    return C;
}()),
    _a.a = 1,
    _a);
var _a;
