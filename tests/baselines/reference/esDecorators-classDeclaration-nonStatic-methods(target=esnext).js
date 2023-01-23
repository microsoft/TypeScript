//// [esDecorators-classDeclaration-nonStatic-methods.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec
    method1() {}

    @dec
    ["method2"]() {}

    @dec
    [method3]() {}
}


//// [esDecorators-classDeclaration-nonStatic-methods.js]
const method3 = "method3";
class C {
    @dec
    method1() { }
    @dec
    ["method2"]() { }
    @dec
    [method3]() { }
}
