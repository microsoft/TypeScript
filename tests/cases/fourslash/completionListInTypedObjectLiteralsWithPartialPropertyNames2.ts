/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/x1: 0,
////};

goTo.marker();
verify.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(2);
