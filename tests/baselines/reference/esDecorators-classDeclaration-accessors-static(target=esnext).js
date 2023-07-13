//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-static.ts] ////

//// [esDecorators-classDeclaration-accessors-static.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(11) static get method1() { return 0; }
    @dec(12) static set method1(value) {}
    @dec(21) static get ["method2"]() { return 0; }
    @dec(22) static set ["method2"](value) {}
    @dec(31) static get [method3]() { return 0; }
    @dec(32) static set [method3](value) {}
}


//// [esDecorators-classDeclaration-accessors-static.js]
const method3 = "method3";
class C {
    @dec(11)
    static get method1() { return 0; }
    @dec(12)
    static set method1(value) { }
    @dec(21)
    static get ["method2"]() { return 0; }
    @dec(22)
    static set ["method2"](value) { }
    @dec(31)
    static get [method3]() { return 0; }
    @dec(32)
    static set [method3](value) { }
}
