/// <reference path='fourslash.ts'/>

//// enum e {
////     "1",
////     2 = 3,
////     3,
////     a,
////     b
//// }
//// 
//// e./**/

goTo.marker();
verify.not.completionListContains('1');
verify.not.completionListContains('"1"');
verify.not.completionListContains('2');
verify.not.completionListContains('3');
verify.completionListContains('a');
verify.completionListContains('b');