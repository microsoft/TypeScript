/// <reference path='fourslash.ts'/>

////var o = {
////    foo() { },
////    bar: 0,
////    "some other name": 1
////};
////
////o["/*1*/bar"];
////o["/*2*/

goTo.marker('1');
verify.completionListContains("foo");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(3);

goTo.marker('2');
verify.completionListContains("some other name");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(3);
