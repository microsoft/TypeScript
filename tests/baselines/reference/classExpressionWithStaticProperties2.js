//// [classExpressionWithStaticProperties2.ts]
var v = class C {
    static a = 1;
    static b
    static c = {
        x: "hi"
    }
    static d = C.c.x + " world";
 };

//// [classExpressionWithStaticProperties2.js]
var _a;
var v = (_a = /** @class */ (function () {
        function C() {
        }
        return C;
    }()),
    _a.a = 1,
    _a.c = {
        x: "hi"
    },
    _a.d = _a.c.x + " world",
    _a);
