/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/
////};

goTo.marker();
verify.memberListContains("x1");
verify.memberListContains("y1");
verify.memberListCount(2);

//      x|
edit.insert("x");
verify.memberListContains("x1");
verify.memberListContains("y1");
verify.memberListCount(2);

//      x1|
edit.insert("1");
verify.memberListContains("x1");
verify.memberListContains("y1");
verify.memberListCount(2);

//      x1: null,|
edit.insert(": null,");
verify.not.memberListContains("x1");
verify.memberListContains("y1");
verify.memberListCount(1);
