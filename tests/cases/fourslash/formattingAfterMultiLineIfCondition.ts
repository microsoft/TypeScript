/// <reference path='fourslash.ts' />

//// var foo;
//// if (foo &&
////     foo) {
/////*comment*/    // This is a comment
////     foo.toString();
//// /**/

goTo.marker();
edit.insert('}');
goTo.marker('comment');
// Comment below multi-line 'if' condition formatting
verify.currentLineContentIs('     // This is a comment');