/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `a ${ g `/*1*/alpha/*2*/ ${/*3*/ 12/*4*/3 /*5*/} beta /*6*/${ /*7*/456 /*8*/} gamma/*9*/` } b ${ g `/*10*/txt/*11*/` } c ${ g `/*12*/aleph /*13*/$/*14*/{ 12/*15*/3 } beit/*16*/` } d`;

verify.signatureHelp({
    marker: test.markerNames(),
    text: "g(templateStrings: any, x: any, y: any, z: any): string",
    parameterCount: 4,
});
