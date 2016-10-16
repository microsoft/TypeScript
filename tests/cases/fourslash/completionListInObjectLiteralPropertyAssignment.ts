/// <reference path='fourslash.ts' />

////var foo;
////interface I {
////    metadata: string;
////    wat: string;
////}
////var x: I = {
////    metadata: "/*1*/
////}

goTo.marker('1');

verify.not.completionListContains("metadata");
verify.not.completionListContains("wat");