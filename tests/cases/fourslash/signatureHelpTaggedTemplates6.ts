/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${ g `/*1*/ /*2*/   /*3*/` }    `

verify.signatureHelp({
    marker: test.markerNames(),
    text: "g(templateStrings: any, x: any, y: any, z: any): string",
    argumentCount: 1,
    parameterCount: 4,
    parameterName: "templateStrings",
    parameterSpan: "templateStrings: any",
});
