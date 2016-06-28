//// [classExpressionWithStaticProperties1.ts]
var v = class C { static a = 1; static b = 2 };

//// [classExpressionWithStaticProperties1.js]
var v = (function () {
    function C() {
    }
    C.a = 1;
    C.b = 2;
    return C;
}());
