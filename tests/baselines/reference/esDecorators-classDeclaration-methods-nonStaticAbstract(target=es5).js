//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticAbstract.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticAbstract.ts]
declare let dec: any;

const method3 = "method3";

abstract class C {
    @dec(1) abstract method1(): void;
    @dec(2) abstract ["method2"](): void;
    @dec(3) abstract [method3](): void;
}


//// [esDecorators-classDeclaration-methods-nonStaticAbstract.js]
var method3 = "method3";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
