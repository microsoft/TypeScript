//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-nonStatic.ts] ////

//// [esDecorators-classDeclaration-accessors-nonStatic.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(11) get method1() { return 0; }
    @dec(12) set method1(value) {}
    @dec(21) get ["method2"]() { return 0; }
    @dec(22) set ["method2"](value) {}
    @dec(31) get [method3]() { return 0; }
    @dec(32) set [method3](value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStatic.js]
const method3 = "method3";
class C {
    @dec(11)
    get method1() { return 0; }
    @dec(12)
    set method1(value) { }
    @dec(21)
    get ["method2"]() { return 0; }
    @dec(22)
    set ["method2"](value) { }
    @dec(31)
    get [method3]() { return 0; }
    @dec(32)
    set [method3](value) { }
}
