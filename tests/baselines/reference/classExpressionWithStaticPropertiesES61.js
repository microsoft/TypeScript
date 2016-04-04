//// [classExpressionWithStaticPropertiesES61.ts]
var v = class C { static a = 1; static b = 2 };

//// [classExpressionWithStaticPropertiesES61.js]
var v = (_a = class C {
},
    _a.a = 1,
    _a.b = 2,
    _a);
var _a;
