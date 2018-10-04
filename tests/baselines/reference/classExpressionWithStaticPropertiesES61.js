//// [classExpressionWithStaticPropertiesES61.ts]
var v = class C { 
    static a = 1;
    static b = 2;
    static c = C.a + 3;
};

//// [classExpressionWithStaticPropertiesES61.js]
var _a;
var v = (_a = class C {
    },
    _a.a = 1,
    _a.b = 2,
    _a.c = _a.a + 3,
    _a);
