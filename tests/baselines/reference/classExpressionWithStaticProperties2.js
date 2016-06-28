//// [classExpressionWithStaticProperties2.ts]
var v = class C { static a = 1; static b };

//// [classExpressionWithStaticProperties2.js]
var v = (function () {
    function C() {
    }
    C.a = 1;
    return C;
}());
