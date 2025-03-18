//// [tests/cases/compiler/classExpressionWithStaticPropertiesES62.ts] ////

//// [classExpressionWithStaticPropertiesES62.ts]
var v = class C {
    static a = 1;
    static b
    static c = {
        x: "hi"
    }
    static d = C.c.x + " world";
 };

//// [classExpressionWithStaticPropertiesES62.js]
var v = class C {
    static a = 1;
    static b;
    static c = {
        x: "hi"
    };
    static d = C.c.x + " world";
};
