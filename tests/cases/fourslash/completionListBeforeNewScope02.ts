/// <reference path='fourslash.ts' />

////a
////
////{
////    let aaaaaa = 10;
////}

goTo.marker("1");
verify.not.completionListContains("aaaaa");