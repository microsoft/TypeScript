/// <reference path='fourslash.ts' />

////module Test10 {
////    var x: string[] = [];
////    x.forEach(function (y) { y./**/} );
////}

goTo.marker();
verify.completionListContains("charAt");
verify.completionListContains("charCodeAt");
verify.completionListContains("length");
verify.completionListContains("concat");
verify.not.completionListContains("toFixed");