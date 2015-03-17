/// <reference path='fourslash.ts' />

////a/*1*/
////
////{
////    let aaaaaa = 10;
////}

goTo.marker("1");
verify.not.completionListContains("aaaaa");