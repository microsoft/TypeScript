/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${/*1*/ /*2*/123/*3*/ /*4*/} asdf ${   41234   }  zxcvb ${ g `    ` }    `

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 4,
    parameterCount: 4,
    parameterName: "x",
    parameterSpan: "x: any",
});
