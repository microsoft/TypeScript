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
// Won't-fixed: Smart indent during chained function calls
verify.indentationIs(4);