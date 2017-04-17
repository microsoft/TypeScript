/// <reference path='fourslash.ts'/>

////type As = 'arf' | 'abacus' | 'abaddon';
////let a: As;
////switch (a) {
////    case '/**/
////}

goTo.marker();
verify.completionListContains("arf");
verify.completionListContains("abacus");
verify.completionListContains("abaddon");
verify.completionListCount(3);

