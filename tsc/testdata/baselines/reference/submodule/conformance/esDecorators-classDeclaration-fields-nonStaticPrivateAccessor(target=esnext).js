//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
class C {
    @dec
    accessor #field1 = 0;
}
