//// [tests/cases/compiler/classExpressionWithStaticProperties1.ts] ////

//// [classExpressionWithStaticProperties1.ts]
var v = class C {
    static a = 1;
    static b = 2;
    static c = C.a + C.b;
};

//// [classExpressionWithStaticProperties1.js]
var v = class C {
    static a = 1;
    static b = 2;
    static c = C.a + C.b;
};
