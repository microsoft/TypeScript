/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `/*1*/ qwe/*2*/rty /*3*/$/*4*/{ 123 }/*5*/ as/*6*/df /*7*/$/*8*/{   41234   }/*9*/  zxc/*10*/vb /*11*/$/*12*/{ g `    ` }/*13*/  /*14*/  /*15*/`

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    argumentCount: 4,
    parameterCount: 4,
    parameterName: "templateStrings",
    parameterSpan: "templateStrings: any",
});
