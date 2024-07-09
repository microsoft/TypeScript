/// <reference path='fourslash.ts'/>

//// class /*classDeclaration*/A {}
//// function f(/*parameterDeclaration*/parameter: any): [|/*parameterName*/parameter|] is [|/*typeReference*/A|] {
////     return typeof parameter === "string";
//// }

verify.baselineGoToDefinition(
    "parameterName",
    "typeReference",
);
