/// <reference path='fourslash.ts'/>

////type As = 'arf' | 'abacus' | 'abaddon';
////let a: As;
////if ('/**/' != a

goTo.marker();
verify.completionListContains("arf");
verify.completionListContains("abacus");
verify.completionListContains("abaddon");
verify.completionListCount(3);

