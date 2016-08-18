//// [classExpressionWithStaticPropertiesES61.ts]
var v = class C { 
    static a = 1;
    static b = 2;
    static c = C.a + 3;
};

//// [classExpressionWithStaticPropertiesES61.js]
var v = (C_1 = class C {
    },
    C_1.a = 1,
    C_1.b = 2,
    C_1.c = C_1.a + 3,
    C_1);
var C_1;
