/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    "x1": 5,
////    /*15*/
////};

goTo.marker("15");
verify.not.completionListContains("x1");
verify.completionListContains("y1");
verify.completionListCount(1);

