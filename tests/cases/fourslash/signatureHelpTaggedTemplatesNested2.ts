/// <reference path="./fourslash.ts"/>

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `/*1*/a $/*2*/{ /*3*/g /*4*/`alpha ${ 123 } beta ${ 456 } gamma`/*5*/ }/*6*/ b $/*7*/{ /*8*/g /*9*/`txt`/*10*/ } /*11*/c ${ /*12*/g /*13*/`aleph ${ 123 } beit`/*14*/ } d/*15*/`;

verify.signatureHelp({
    marker: test.markerNames(),
    text: "f(templateStrings: any, x: any, y: any, z: any): number",
    parameterCount: 4,
});
