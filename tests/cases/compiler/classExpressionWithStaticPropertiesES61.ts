//@target: es6
var v = class C { 
    static a = 1;
    static b = 2;
    static c = C.a + 3;
};