//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAbstract.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAbstract.ts]
declare let dec: any;

const field3 = "field3";

abstract class C {
    @dec(1) abstract field1: number;
    @dec(2) abstract ["field2"]: number;
    @dec(3) abstract [field3]: number;
}


//// [esDecorators-classDeclaration-fields-nonStaticAbstract.js]
const field3 = "field3";
class C {
}
