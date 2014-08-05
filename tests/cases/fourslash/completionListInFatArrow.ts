/// <reference path='fourslash.ts' />

////var items = [0, 1, 2];
////items.forEach((n) => {
////    /**/
////    var q = n;
////});

goTo.marker();
edit.insert('it');
verify.completionListContains('items');