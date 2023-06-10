//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-static.ts] ////

//// [esDecorators-classDeclaration-methods-static.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) static method1() {}
    @dec(2) static ["method2"]() {}
    @dec(3) static [method3]() {}
}


//// [esDecorators-classDeclaration-methods-static.js]
const method3 = "method3";
class C {
    @dec(1)
    static method1() { }
    @dec(2)
    static ["method2"]() { }
    @dec(3)
    static [method3]() { }
}
