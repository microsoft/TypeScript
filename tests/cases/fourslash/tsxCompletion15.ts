/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// class MyElement {}
//// var x1 = <MyElement></My/**/

goTo.marker("");
verify.memberListCount(1);
verify.completionListContains('MyElement');