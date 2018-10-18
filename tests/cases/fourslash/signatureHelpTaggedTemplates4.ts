/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${ 123 } asdf ${/*1*/  /*2*/ /*3*/41/*4*/234/*5*/   /*6*/}  zxcvb ${ g `    ` }    `

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 4,
    parameterCount: 4,
    parameterName: "y",
    parameterSpan: "y: any",
});
