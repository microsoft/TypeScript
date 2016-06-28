/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div><//**/

goTo.marker();
verify.memberListCount(1);
verify.completionListContains('div');