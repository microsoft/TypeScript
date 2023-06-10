//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-multipleDecorators.ts] ////

//// [esDecorators-classDeclaration-multipleDecorators.ts]
declare let dec1: any, dec2: any;

@dec1
@dec2
class C {
}


//// [esDecorators-classDeclaration-multipleDecorators.js]
@dec1
@dec2
class C {
}
