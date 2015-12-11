/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = <div/**/;

goTo.marker();
verify.memberListCount(1)
verify.completionListContains("HTMLDivElement");
