/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/
////};

goTo.marker();
verify.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(2);

//      x|
edit.insert("x");
verify.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(2);

//      x1|
edit.insert("1");
verify.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(2);

//      x1: null,|
edit.insert(": null,");
verify.not.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(1);
