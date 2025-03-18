//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStatic.ts] ////

//// [esDecorators-classDeclaration-methods-nonStatic.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) method1() {}
    @dec(2) ["method2"]() {}
    @dec(3) [method3]() {}
}


//// [esDecorators-classDeclaration-methods-nonStatic.js]
const method3 = "method3";
class C {
    @dec(1)
    method1() { }
    @dec(2)
    ["method2"]() { }
    @dec(3)
    [method3]() { }
}
