//// [tests/cases/compiler/classExpressionWithStaticPropertiesES61.ts] ////

//// [classExpressionWithStaticPropertiesES61.ts]
var v = class C { 
    static a = 1;
    static b = 2;
    static c = C.a + 3;
};

//// [classExpressionWithStaticPropertiesES61.js]
var v = class C {
    static a = 1;
    static b = 2;
    static c = C.a + 3;
};
