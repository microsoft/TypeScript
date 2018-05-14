/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${/*1*/ /*2*/g/*3*/ /*4*/`    `/*5*/ /*6*/}    `

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 4,
    parameterCount: 4,
    parameterName: "z",
    parameterSpan: "z: any",
});
