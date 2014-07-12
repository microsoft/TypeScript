/// <reference path='fourslash.ts' />

////interface ig {
////  module(data): ig;
////   requires(data): ig;
////   defines(data): ig;
////}
////
////var ig: ig;
////ig.module(
////   'mything'
////).requires(
////   'otherstuff'
////).defines(/*0*//*1*/
////});

goTo.marker("1");
edit.insert("\r\n");
goTo.marker("0");
// The expected scenario is failing due to bug 680754 - Wrong indent on chained function calls.
//verify.indentationIs(0);
verify.indentationIs(4);