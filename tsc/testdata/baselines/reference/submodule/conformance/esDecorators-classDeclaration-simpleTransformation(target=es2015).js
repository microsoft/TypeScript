//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-simpleTransformation.ts] ////

//// [esDecorators-classDeclaration-simpleTransformation.ts]
declare let dec: any;

@dec
class C {
}


//// [esDecorators-classDeclaration-simpleTransformation.js]
@dec
class C {
}
