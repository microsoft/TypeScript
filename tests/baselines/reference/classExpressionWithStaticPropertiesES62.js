//// [classExpressionWithStaticPropertiesES62.ts]
var v = class C { static a = 1; static b };

//// [classExpressionWithStaticPropertiesES62.js]
var v = (_a = class C {
    },
    _a.a = 1,
    _a);
var _a;
