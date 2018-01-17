/// <reference path='fourslash.ts'/>

// @Filename: foo.ts
////let x = 1;
////
////export { /**/[|x|] as y };

goTo.marker();
verify.renameInfoSucceeded(/*displayName*/"x", /*fullDisplayName*/"x");