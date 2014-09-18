/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/x1: 0,
////};

goTo.marker();
verify.memberListContains("x1");
verify.memberListContains("y1");
verify.memberListCount(2);
