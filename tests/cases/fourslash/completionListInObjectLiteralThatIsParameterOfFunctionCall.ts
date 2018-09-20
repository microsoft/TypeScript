/// <reference path='fourslash.ts'/>

////function f(a: { xa: number; xb: number; }) { }
////var xc;
////f({
////    /**/

goTo.marker()
verify.completionListContains('xa');
verify.completionListContains('xb');
verify.completionListCount(2);