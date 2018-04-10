/// <reference path='fourslash.ts' />

// @noLib: true
/////**
////  * @param start START
////  */
////function foo(start: number) {
////    return "";
////}
////
////foo/*1*/
goTo.marker('1');
verify.not.signatureHelpPresent();
edit.insert("(");
verify.currentParameterHelpArgumentDocCommentIs("START");
