/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `/*1*/  \\\/*2*/`/*3*/ /*4*/

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 1,
    parameterCount: 4,
    parameterName: "templateStrings",
    parameterSpan: "templateStrings: any",
});
