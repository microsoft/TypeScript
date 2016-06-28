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
var v = (C_1 = class C {
    },
    C_1.a = 1,
    C_1.c = {
        x: "hi"
    },
    C_1.d = C_1.c.x + " world",
    C_1);
var C_1;
