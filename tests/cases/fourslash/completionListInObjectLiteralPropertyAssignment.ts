/// <reference path='fourslash.ts' />

////var foo;
////interface I {
////    metadata: string;
////    wat: string;
////}
////var x: I = {
////    metadata: "/*1*/
////}

verify.completions({ marker: "1", exact: [] });
