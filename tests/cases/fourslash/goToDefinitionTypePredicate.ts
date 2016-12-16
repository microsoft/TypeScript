/// <reference path='fourslash.ts'/>

//// /*classDeclaration*/class A {}
//// function f(/*parameterDeclaration*/parameter: any): /*parameterName*/parameter is /*typeReference*/A {
////     return typeof parameter === "string";
//// }

verify.goToDefinition({
    parameterName: "parameterDeclaration",
    typeReference: "classDeclaration"
});
