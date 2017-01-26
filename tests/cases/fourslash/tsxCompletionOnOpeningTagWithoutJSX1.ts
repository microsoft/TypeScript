/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = </**/;

goTo.marker();
verify.completionListCount(42);
