/// <reference path='fourslash.ts' />

////module Test10 {
////    var x: string[] = [];
////    x.forEach(function (y) { y./**/} );
////}

goTo.marker();
verify.memberListContains("charAt");
verify.memberListContains("charCodeAt");
verify.memberListContains("length");
verify.memberListContains("concat");
verify.not.memberListContains("toFixed");