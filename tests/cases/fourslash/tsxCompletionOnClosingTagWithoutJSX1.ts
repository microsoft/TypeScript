/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div><//**/

goTo.marker();
verify.completionListCount(1);
verify.completionListContains('div');