/// <reference path='fourslash.ts'/>

////function f(a: { xa: number; xb: number; }) { }
////var xc;
////f({
////    /**/

goTo.marker()
verify.memberListContains('xa');
verify.memberListContains('xb');
verify.memberListCount(2);