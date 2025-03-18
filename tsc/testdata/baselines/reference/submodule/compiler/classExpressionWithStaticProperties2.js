//// [tests/cases/compiler/classExpressionWithStaticProperties2.ts] ////

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
var v = class C {
    static a = 1;
    static b;
    static c = {
        x: "hi"
    };
    static d = C.c.x + " world";
};
