//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAbstractAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAbstractAccessor.ts]
declare let dec: any;

const field3 = "field3";

abstract class C {
    @dec(1) abstract accessor field1: number;
    @dec(2) abstract accessor ["field2"]: number;
    @dec(3) abstract accessor [field3]: number;
}


//// [esDecorators-classDeclaration-fields-nonStaticAbstractAccessor.js]
const field3 = "field3";
class C {
}
