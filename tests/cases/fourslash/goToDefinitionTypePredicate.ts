/// <reference path='fourslash.ts'/>

//// /*classDeclaration*/class A {}
//// function f(/*parameterDeclaration*/parameter: any): /*parameterName*/parameter is /*typeReference*/A {
////     return typeof parameter === "string";
//// }

goTo.marker('parameterName');

goTo.definition();
verify.caretAtMarker('parameterDeclaration');

goTo.marker('typeReference');

goTo.definition();
verify.caretAtMarker('classDeclaration');