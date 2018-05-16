/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `   ${  123 } ${/*1*/  }   `

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 3,
    parameterCount: 4,
    parameterName: "y",
    parameterSpan: "y: any",
});
