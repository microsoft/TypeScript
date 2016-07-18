//// [classExpressionWithStaticProperties2_ES6.ts]
var v = class C { static a = 1; static b };

//// [classExpressionWithStaticProperties2_ES6.js]
var v = (_a = class C {
    },
    _a.a = 1,
    _a);
var _a;
