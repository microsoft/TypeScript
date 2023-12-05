//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAccessor.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) accessor field1 = 1;
    @dec(2) accessor ["field2"] = 2;
    @dec(3) accessor [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStaticAccessor.js]
const field3 = "field3";
class C {
    @dec(1)
    accessor field1 = 1;
    @dec(2)
    accessor ["field2"] = 2;
    @dec(3)
    accessor [field3] = 3;
}
